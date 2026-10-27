import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

type Call = { url: string; init: RequestInit };
type Responder = (call: Call) => Response | Promise<Response>;

const storage = new Map<string, string>();
const fakeWindow = Object.assign(new EventTarget(), {
  localStorage: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => void storage.set(key, value),
    removeItem: (key: string) => void storage.delete(key),
  },
});
(globalThis as unknown as { window: typeof fakeWindow }).window = fakeWindow;
process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.test/api/v1";

const { apiRequest, ApiError } = await import("../lib/api-client.ts");
const { SESSION_EXPIRED_EVENT, clearSession, readSession, writeSession } = await import(
  "../lib/auth-session.ts"
);

function jwt(label: string): string {
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + 3600;
  return `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: label, exp })}.signature-${label}`;
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

let calls: Call[] = [];
function mockFetch(responder: Responder) {
  calls = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const call = { url: String(input), init };
    calls.push(call);
    return responder(call);
  }) as typeof fetch;
}

function authHeader(call: Call): string | undefined {
  return (call.init.headers as Record<string, string>).Authorization;
}

beforeEach(() => {
  storage.clear();
  clearSession();
});

describe("apiRequest", () => {
  it("unwraps the backend success envelope", async () => {
    mockFetch(() => json(200, { success: true, data: { ok: 1 } }));
    assert.deepEqual(await apiRequest("/health", { auth: false }), { ok: 1 });
    assert.equal(calls[0].url, "https://api.example.test/api/v1/health");
    assert.equal(authHeader(calls[0]), undefined);
  });

  it("reports network failures with a friendly message", async () => {
    mockFetch(() => {
      throw new TypeError("Failed to fetch");
    });
    await assert.rejects(apiRequest("/public/enquiries", { method: "POST", body: {}, auth: false }), (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.isNetwork, true);
      assert.match(error.message, /couldn't reach PolyStoreX/);
      return true;
    });
  });

  it("never surfaces server error details", async () => {
    mockFetch(() => json(500, { message: "PrismaClientKnownRequestError at Object.query (/app/dist/x.js:1:2)" }));
    await assert.rejects(apiRequest("/customer/kyc"), (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.status, 500);
      assert.doesNotMatch(error.message, /Prisma|dist/);
      return true;
    });
  });

  it("keeps only a well-formed request ID as the support reference", async () => {
    mockFetch(() => json(500, { message: "boom", requestId: "req-7f3a9c" }));
    await assert.rejects(apiRequest("/customer/credit/applications/x/submit"), (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.requestId, "req-7f3a9c");
      return true;
    });

    mockFetch(() => json(500, { message: "boom", requestId: "<script>alert(1)</script>" }));
    await assert.rejects(apiRequest("/customer/credit/applications/x/submit"), (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.requestId, null);
      return true;
    });
  });

  it("hides internal-looking validation messages but keeps human ones", async () => {
    mockFetch(() => json(400, { message: ["Invalid `prisma.user.findUnique()` invocation"] }));
    await assert.rejects(apiRequest("/x", { auth: false }), (error) => {
      assert.doesNotMatch((error as Error).message, /prisma/i);
      return true;
    });

    mockFetch(() => json(400, { message: ["phone must be a valid Indian mobile number"] }));
    await assert.rejects(apiRequest("/x", { auth: false }), /valid Indian mobile/);
  });

  it("refreshes an expired access token once and retries", async () => {
    writeSession({ accessToken: jwt("old"), refreshToken: jwt("refresh") });
    mockFetch(({ url, init }) => {
      if (url.endsWith("/auth/refresh")) {
        return json(200, { success: true, data: { accessToken: jwt("new"), refreshToken: jwt("refresh2") } });
      }
      const token = (init.headers as Record<string, string>).Authorization;
      return token === `Bearer ${jwt("new")}`
        ? json(200, { success: true, data: { id: "u1" } })
        : json(401, { message: "Unauthorized" });
    });

    assert.deepEqual(await apiRequest("/auth/me"), { id: "u1" });
    assert.equal(calls.length, 3);
    assert.equal(readSession()?.accessToken, jwt("new"));
  });

  it("clears the session and signals expiry when the refresh is rejected", async () => {
    writeSession({ accessToken: jwt("old"), refreshToken: jwt("refresh") });
    let expired = 0;
    const onExpired = () => void expired++;
    fakeWindow.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    mockFetch(() => json(401, { message: "Unauthorized" }));

    await assert.rejects(apiRequest("/auth/me"), (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.isUnauthorized, true);
      return true;
    });
    fakeWindow.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);

    assert.equal(readSession(), null);
    assert.equal(storage.size, 0);
    assert.ok(expired >= 1);
  });
});

describe("readSession", () => {
  it("discards malformed stored sessions", () => {
    storage.set("swaroop-web-session", JSON.stringify({ accessToken: "not-a-jwt" }));
    assert.equal(readSession(), null);
    assert.equal(storage.has("swaroop-web-session"), false);
  });
});

# Sanity CMS — PolyStoreX Blog

The marketing site loads blog content from [Sanity](https://www.sanity.io/) using the **public read CDN** only. No write tokens belong in this repository or in `NEXT_PUBLIC_*` variables.

## Account ownership

Sanity project is owned under **swaroop.veylorn@gmail.com** / Swaroop org.

| Field | Value |
|-------|--------|
| Project | PolyStoreX |
| Project ID | `2qeel1cr` |
| Organization ID | `opsig3uky` |
| Dataset | `production` |
| Manage | https://www.sanity.io/manage/project/2qeel1cr |

Set `NEXT_PUBLIC_SANITY_PROJECT_ID=2qeel1cr` in `.env.local` and in Vercel.

## Environment variables

Copy from `.env.example` into `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes (for live content) | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Defaults to `2024-01-01` |

If `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, `/blogs` and the home preview show a **coming soon** state — the site does not crash.

**Never** commit `SANITY_API_TOKEN` or other write credentials to the website app. Publishing happens in Sanity Studio, not from Next.js.

## Sanity project setup

1. Log in: `npx sanity login` (use the Swaroop / `swaroop.veylorn@gmail.com` account).
2. Confirm `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID=2qeel1cr`.
3. Deploy the blog schema to the project (first time):

   ```bash
   npx sanity schema deploy
   ```

4. Add CORS origins under **API** → **CORS origins**:
   - `http://localhost:3004`
   - `https://polystorex.com`
   - `https://www.polystorex.com`

## Local Studio

Schema lives in `sanity/schemaTypes/`. Config is at the repo root (`sanity.config.ts`).

```bash
npm run studio
```

This runs `sanity dev` (default studio URL is printed in the terminal, often `http://localhost:3333`).

Embedded studio at `/studio` is **not** required; keeping Studio as a local/separate tool avoids bundling write capabilities into the public site.

## Content model

Document type: **`post`**

- `title`, `slug`, `mainImage`, `excerpt`, `body` (portable text)
- `author`, `category`, `tags`
- `seoTitle`, `seoDescription`
- `publishedAt`, `updatedAt`, `featured`
- `status`: `draft` | `published` (only **published** posts appear on the site)

## CORS & API access

For the public CDN, Sanity serves published documents without a token. If fetches fail in development, add your local origin (e.g. `http://localhost:3004`) under **API** → **CORS origins** in the Sanity project settings.

## Deployment (Vercel)

Add the three `NEXT_PUBLIC_SANITY_*` variables in the Vercel project settings. Redeploy after the project ID is set so static paths and the sitemap can include blog URLs.

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { env, PROPOSED_APP_HOSTS, platformLinks } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

const PLATFORMS = {
  customer: {
    title: "Customer platform",
    home: platformLinks.customerLogin,
    proposed: PROPOSED_APP_HOSTS.customer,
  },
  seller: {
    title: "Seller platform",
    home: platformLinks.sellerLogin,
    proposed: PROPOSED_APP_HOSTS.seller,
  },
  admin: {
    title: "Admin panel",
    home: env.adminAppUrl,
    proposed: PROPOSED_APP_HOSTS.admin,
  },
} as const;

type PlatformKey = keyof typeof PLATFORMS;

type PageProps = {
  params: Promise<{ platform: string }>;
};

export async function generateStaticParams() {
  return Object.keys(PLATFORMS).map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform } = await params;
  const config = PLATFORMS[platform as PlatformKey];
  if (!config) return {};
  return pageMetadata({
    title: config.title,
    description: `Continue to the PolyStoreX ${config.title.toLowerCase()}.`,
    path: `/apps/${platform}`,
    noIndex: true,
  });
}

/** Legacy /apps/* routes redirect to branded panel hosts (login → dashboard after auth). */
export default async function AppPlatformRedirect({ params }: PageProps) {
  const { platform } = await params;
  const config = PLATFORMS[platform as PlatformKey];
  if (!config) notFound();
  redirect(config.home);
}

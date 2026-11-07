import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, isSanityConfigured, projectId } from "@/sanity/env";

const builder = isSanityConfigured()
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function imageUrl(
  source: SanityImageSource | null | undefined,
  options?: { width?: number; height?: number },
): string | undefined {
  if (!source || !builder) return undefined;
  let img = builder.image(source).auto("format");
  if (options?.width) img = img.width(options.width);
  if (options?.height) img = img.height(options.height);
  return img.url();
}

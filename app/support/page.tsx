import { permanentRedirect } from "next/navigation";

/**
 * App / marketing "Contact Support" alias.
 * Seller and customer clients open /contact; this keeps /support as a stable
 * production path that lands on the same enquiry form.
 */
export default function SupportPage() {
  permanentRedirect("/contact?topic=OTHER");
}

/**
 * Client-owned DNS / Vercel checklist for branded app subdomains.
 * Do not modify GoDaddy DNS from this codebase — the client applies records.
 */
export const DNS_CHECKLIST = [
  {
    id: 'apex',
    host: 'polystorex.com',
    purpose: 'Public marketing website',
    vercelProject: 'swaroop-website',
    status: 'Live (client-confirmed)',
  },
  {
    id: 'www',
    host: 'www.polystorex.com',
    purpose: 'WWW alias / sitemap host',
    vercelProject: 'swaroop-website',
    status: 'Verify redirect vs apex canonical',
  },
  {
    id: 'customer',
    host: 'customer.polystorex.com',
    purpose: 'Customer WebApp',
    vercelProject: 'swaroop-customer-webapp',
    status: 'Pending client DNS + Vercel domain attach',
    envVar: 'NEXT_PUBLIC_CUSTOMER_APP_URL',
  },
  {
    id: 'seller',
    host: 'seller.polystorex.com',
    purpose: 'Seller WebApp',
    vercelProject: 'swaroop-seller-webapp',
    status: 'Pending client DNS + Vercel domain attach',
    envVar: 'NEXT_PUBLIC_SELLER_APP_URL',
  },
  {
    id: 'admin',
    host: 'admin.polystorex.com',
    purpose: 'Admin Panel',
    vercelProject: 'swaroop-admin',
    status: 'Pending client DNS + Vercel domain attach',
    envVar: 'NEXT_PUBLIC_ADMIN_APP_URL',
  },
] as const;

export const DNS_CLIENT_STEPS = [
  'In GoDaddy DNS for polystorex.com, add the CNAME/A records shown by Vercel for each subdomain.',
  'In each Vercel project → Settings → Domains, add the matching hostname and wait for TLS.',
  'Set NEXT_PUBLIC_*_APP_URL env vars on swaroop-website to the verified https://… hosts.',
  'Redeploy swaroop-website so CTAs leave /apps/* fallbacks.',
  'Confirm robots.txt Sitemap is https://www.polystorex.com/sitemap.xml (not localhost).',
  'Do not publish Play/App Store badge URLs until store listings exist.',
] as const;

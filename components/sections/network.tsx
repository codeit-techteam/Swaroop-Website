import { Factory, Route, Warehouse, Waypoints } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Abstract network diagram of India's major industrial clusters. Positions are
 * schematic (not a boundary map) and the clusters describe where industrial
 * demand sits — not confirmed Swaroop facilities.
 */
const HUBS = [
  { id: "ncr", label: "Delhi NCR", region: "North", x: 205, y: 118 },
  { id: "ahd", label: "Ahmedabad", region: "West", x: 92, y: 218 },
  { id: "ind", label: "Indore", region: "Central", x: 172, y: 236 },
  { id: "mum", label: "Mumbai", region: "West", x: 104, y: 300 },
  { id: "pune", label: "Pune", region: "West", x: 132, y: 326 },
  { id: "kol", label: "Kolkata", region: "East", x: 338, y: 230 },
  { id: "hyd", label: "Hyderabad", region: "South", x: 206, y: 336 },
  { id: "blr", label: "Bengaluru", region: "South", x: 182, y: 414 },
  { id: "chn", label: "Chennai", region: "South", x: 232, y: 412 },
] as const;

const LEFT_LABELS = new Set<string>(["kol", "blr"]);

const LINKS: [string, string][] = [
  ["ncr", "ind"],
  ["ncr", "ahd"],
  ["ncr", "kol"],
  ["ahd", "mum"],
  ["ahd", "ind"],
  ["mum", "pune"],
  ["ind", "pune"],
  ["ind", "kol"],
  ["ind", "hyd"],
  ["pune", "hyd"],
  ["hyd", "blr"],
  ["hyd", "chn"],
  ["blr", "chn"],
  ["kol", "chn"],
];

const LEGEND = [
  { icon: Factory, title: "Industrial hubs", detail: "Manufacturing clusters where polymer and chemical demand concentrates." },
  { icon: Route, title: "Distribution", detail: "Supply routed from verified sellers towards buyer locations." },
  { icon: Warehouse, title: "Warehousing", detail: "Seller inventory managed across warehouse locations on the platform." },
  { icon: Waypoints, title: "Logistics", detail: "Dispatch and delivery coordinated for every confirmed order." },
];

function hub(id: string) {
  return HUBS.find((h) => h.id === id)!;
}

export function NetworkSection() {
  return (
    <section aria-labelledby="network-heading" className="section relative overflow-hidden bg-white">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Pan-India network"
            title={<span id="network-heading">Built for India's industrial corridors.</span>}
            description="Swaroop is designed for pan-India procurement — connecting verified supply with buyers across the country's major manufacturing regions."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {LEGEND.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="flex gap-3.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <item.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-brand-800">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-8 border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-ink-subtle">
            Clusters shown are major industrial regions, not a list of Swaroop facilities.
            Serviceability, warehousing and delivery timelines are confirmed for each order.
          </p>
        </div>

        <figure data-reveal className="relative mx-auto w-full max-w-[520px]">
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 p-4 shadow-lift sm:p-8">
            <div aria-hidden="true" className="grid-texture absolute inset-0" />
            <svg
              viewBox="40 80 340 380"
              role="img"
              aria-labelledby="network-title network-desc"
              className="relative h-auto w-full"
            >
              <title id="network-title">Swaroop industrial network</title>
              <desc id="network-desc">
                Schematic diagram linking India's major industrial clusters: Delhi NCR, Ahmedabad,
                Indore, Mumbai, Pune, Kolkata, Hyderabad, Bengaluru and Chennai.
              </desc>
              <defs>
                <radialGradient id="hub-glow">
                  <stop offset="0%" stopColor="#478FFF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#478FFF" stopOpacity="0" />
                </radialGradient>
                <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.1" fill="rgb(163 199 255 / 0.12)" />
                </pattern>
              </defs>
              <rect x="40" y="80" width="340" height="380" fill="url(#dots)" />
              {LINKS.map(([from, to]) => {
                const a = hub(from);
                const b = hub(to);
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2 - 14;
                return (
                  <path
                    key={`${from}-${to}`}
                    d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`}
                    fill="none"
                    stroke="rgb(117 171 255 / 0.55)"
                    strokeWidth="1.2"
                    className="flow-line animate-flow-dash"
                  />
                );
              })}
              {HUBS.map((h, index) => (
                <g key={h.id}>
                  <circle cx={h.x} cy={h.y} r="16" fill="url(#hub-glow)" />
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r="7"
                    fill="none"
                    stroke="#75ABFF"
                    strokeOpacity="0.6"
                    className="origin-center animate-pulse-dot"
                    style={{ transformBox: "fill-box", animationDelay: `${index * 0.25}s` }}
                  />
                  <circle cx={h.x} cy={h.y} r="3.6" fill="#FFFFFF" />
                  <text
                    x={h.x + (LEFT_LABELS.has(h.id) ? -10 : 10)}
                    y={h.y + (h.id === "blr" ? 20 : -9)}
                    textAnchor={LEFT_LABELS.has(h.id) ? "end" : "start"}
                    className="fill-white text-[11px] font-semibold"
                  >
                    {h.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <figcaption className="mt-4 text-center text-xs text-ink-subtle">
            Schematic illustration — not to scale.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

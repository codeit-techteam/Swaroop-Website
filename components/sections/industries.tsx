import Image, { type StaticImageData } from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import automotive from "@/public/images/industry-automotive.webp";
import chemicals from "@/public/images/industry-chemicals.webp";
import construction from "@/public/images/industry-construction.webp";
import consumer from "@/public/images/industry-consumer.webp";
import electrical from "@/public/images/industry-electrical.webp";
import manufacturing from "@/public/images/industry-manufacturing.webp";
import packaging from "@/public/images/industry-packaging.webp";

type Industry = {
  name: string;
  materials: string;
  image: StaticImageData;
  alt: string;
};

/** Mapped from the applications recorded against Grade Master grades. */
const INDUSTRIES: Industry[] = [
  { name: "Packaging", materials: "PE film grades, PP raffia, PET, HIPS", image: packaging, alt: "Rolls of clear and white packaging film in a converting plant" },
  { name: "Automotive", materials: "ABS, PP, Nylon, PBT, compounds", image: automotive, alt: "Injection-moulded black automotive plastic components" },
  { name: "Construction & Infrastructure", materials: "PVC and HDPE pipe and profile grades", image: construction, alt: "Stacks of grey PVC and black HDPE pipes at a construction site" },
  { name: "Electrical & Cables", materials: "Nylon, PC, PBT, specialty cable compounds", image: electrical, alt: "Spools of electrical cable with coloured polymer insulation" },
  { name: "Consumer Goods", materials: "HDPE, PP, PET, SAN, GPPS", image: consumer, alt: "Blow-moulded white plastic bottles on a production conveyor" },
  { name: "Chemicals & Pharma", materials: "Solvents, intermediates, industrial chemicals", image: chemicals, alt: "Stainless steel chemical storage tanks and containers" },
  { name: "Industrial Manufacturing", materials: "Masterbatch, elastomers, engineering plastics", image: manufacturing, alt: "Plastic injection moulding machine with a hopper of polymer granules" },
];

export function Industries() {
  return (
    <section aria-labelledby="industries-heading" className="section bg-paper">
      <div className="container">
        <SectionHeading
          eyebrow="Industries"
          title={<span id="industries-heading">Materials for the industries that build India.</span>}
          description="From flexible packaging to infrastructure pipes, the Grade Master covers the materials these sectors buy every day."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry, index) => (
            <li
              key={industry.name}
              data-reveal
              style={{ "--reveal-delay": `${(index % 4) * 70}ms` } as React.CSSProperties}
              className={cn(
                "group relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-900",
                index === 0 && "sm:col-span-2 sm:aspect-[16/10] lg:aspect-auto",
              )}
            >
              <Image
                src={industry.image}
                alt={industry.alt}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                placeholder="blur"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className={cn("font-semibold text-white", index === 0 ? "text-2xl sm:text-3xl" : "text-xl")}>
                  {industry.name}
                </h3>
                <p className="mt-1.5 text-sm text-brand-100/80">{industry.materials}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

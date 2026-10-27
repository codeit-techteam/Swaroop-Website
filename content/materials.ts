/**
 * Public marketing view of the PolyStoreX Grade Master taxonomy
 * (Swaroop-Backend `prisma/seed-data/master-data.normalized.json`).
 *
 * Only category families and typical applications are listed here - live
 * grades, offers, prices and availability stay inside the authenticated
 * Customer / Seller platforms.
 */
export type MaterialFamily = {
  code: string;
  name: string;
  fullName: string;
  summary: string;
  applications: string[];
};

export type MaterialGroup = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon:
    | "polymers"
    | "compounds"
    | "masterbatch"
    | "elastomers"
    | "chemicals"
    | "solvents"
    | "intermediates"
    | "recycled"
    | "base-oils"
    | "specialty";
  applications: string[];
  families?: MaterialFamily[];
};

export const POLYMER_FAMILIES: MaterialFamily[] = [
  {
    code: "HDPE",
    name: "HDPE",
    fullName: "High-density polyethylene",
    summary: "Stiff, tough and chemical-resistant.",
    applications: ["Film", "Blow moulding", "Pipes & fittings", "Drums & containers"],
  },
  {
    code: "LDPE",
    name: "LDPE",
    fullName: "Low-density polyethylene",
    summary: "Flexible, clear and easy to process.",
    applications: ["Film", "Bags", "Lamination", "Closures"],
  },
  {
    code: "LLDPE",
    name: "LLDPE",
    fullName: "Linear low-density polyethylene",
    summary: "High puncture and tear strength.",
    applications: ["Stretch wrap", "Agricultural film", "Pouches", "Rotomoulded tanks"],
  },
  {
    code: "PP",
    name: "PP",
    fullName: "Polypropylene",
    summary: "Light, versatile and heat-resistant.",
    applications: ["Woven sacks & raffia", "FIBC", "Injection moulding", "Housewares"],
  },
  {
    code: "PET",
    name: "PET",
    fullName: "Polyethylene terephthalate",
    summary: "Clear, strong packaging resin.",
    applications: ["Bottles", "Sheet", "Thermoforming"],
  },
  {
    code: "PVC",
    name: "PVC",
    fullName: "Polyvinyl chloride",
    summary: "Rigid, durable and weather-resistant.",
    applications: ["Pipes & fittings", "Profiles", "Windows", "Sheets"],
  },
  {
    code: "ABS",
    name: "ABS",
    fullName: "Acrylonitrile butadiene styrene",
    summary: "Impact-resistant engineering plastic.",
    applications: ["Automotive", "Appliances", "Injection moulding"],
  },
  {
    code: "HIPS",
    name: "HIPS",
    fullName: "High-impact polystyrene",
    summary: "Easy forming with good impact strength.",
    applications: ["Packaging", "Appliances"],
  },
  {
    code: "NYLON",
    name: "Nylon",
    fullName: "Polyamide",
    summary: "Strong, wear-resistant engineering polymer.",
    applications: ["Electrical", "Automotive", "Textiles"],
  },
  {
    code: "EVA",
    name: "EVA",
    fullName: "Ethylene-vinyl acetate",
    summary: "Soft, flexible and resilient.",
    applications: ["Film", "Foam", "Adhesives"],
  },
  {
    code: "POM",
    name: "POM",
    fullName: "Polyoxymethylene (acetal)",
    summary: "Low-friction and dimensionally stable.",
    applications: ["Gears", "Precision parts"],
  },
  {
    code: "PC",
    name: "PC",
    fullName: "Polycarbonate",
    summary: "Transparent with high impact strength.",
    applications: ["Electrical", "Transparent parts"],
  },
  {
    code: "SAN",
    name: "SAN",
    fullName: "Styrene acrylonitrile",
    summary: "Clear, rigid and chemical-resistant.",
    applications: ["Housewares", "Packaging"],
  },
  {
    code: "GPPS",
    name: "GPPS",
    fullName: "General-purpose polystyrene",
    summary: "Clear, rigid and easy to mould.",
    applications: ["Packaging", "Disposables"],
  },
  {
    code: "PMMA",
    name: "PMMA",
    fullName: "Polymethyl methacrylate (acrylic)",
    summary: "Optical clarity and weatherability.",
    applications: ["Sheets", "Lighting", "Optical"],
  },
  {
    code: "PBT",
    name: "PBT",
    fullName: "Polybutylene terephthalate",
    summary: "Heat-stable engineering polyester.",
    applications: ["Electrical", "Automotive"],
  },
];

export const MATERIAL_GROUPS: MaterialGroup[] = [
  {
    slug: "polymers",
    name: "Polymers",
    tagline: "Commodity and engineering resins",
    description:
      "Polyethylene, polypropylene, PVC, PET and engineering plastics for film, moulding, extrusion and fibre.",
    icon: "polymers",
    applications: ["Packaging", "Pipes", "Film", "Injection moulding", "Automotive"],
    families: POLYMER_FAMILIES,
  },
  {
    slug: "compounds",
    name: "Compounds",
    tagline: "Filled and reinforced grades",
    description:
      "Performance compounds engineered for strength, stiffness and finish in demanding parts.",
    icon: "compounds",
    applications: ["Automotive", "Appliances", "Electrical"],
  },
  {
    slug: "masterbatch",
    name: "Masterbatch",
    tagline: "Colour and additive concentrates",
    description:
      "Colour and additive masterbatches that bring consistency to every production run.",
    icon: "masterbatch",
    applications: ["Colouring", "Additives"],
  },
  {
    slug: "elastomers",
    name: "Elastomers",
    tagline: "Flexible, resilient polymers",
    description:
      "Elastomers for sealing, cushioning, cable compounds and impact modification.",
    icon: "elastomers",
    applications: ["Hoses", "Footwear", "Cable", "Seals", "Automotive"],
  },
  {
    slug: "chemicals",
    name: "Chemicals",
    tagline: "Industrial process chemicals",
    description:
      "Industrial chemicals used across processing, coatings, detergents and resin manufacturing.",
    icon: "chemicals",
    applications: ["Chemical processing", "Paints", "Soaps", "Resins", "Laminates"],
  },
  {
    slug: "solvents",
    name: "Solvents",
    tagline: "Process and formulation solvents",
    description:
      "Solvents for coatings, inks, adhesives, cleaning and synthesis, including pharma and electronics use.",
    icon: "solvents",
    applications: ["Coatings", "Inks", "Adhesives", "Pharma", "Electronics"],
  },
  {
    slug: "intermediates",
    name: "Intermediates",
    tagline: "Petrochemical building blocks",
    description:
      "Intermediates that feed downstream polymers, resins and coating systems.",
    icon: "intermediates",
    applications: ["Resins", "Coatings", "Polymer feedstock"],
  },
  {
    slug: "recycled",
    name: "Recycled",
    tagline: "Circular polymer grades",
    description:
      "Recycled polymer grades for moulding, pipes, film, compounding and fibre.",
    icon: "recycled",
    applications: ["Moulding", "Pipes", "Film", "Compounding", "Fibre"],
  },
  {
    slug: "base-oils",
    name: "Base Oils",
    tagline: "Lubricant base stocks",
    description: "Base oils for lubricant manufacturing and blending.",
    icon: "base-oils",
    applications: ["Lubricants", "Blending"],
  },
  {
    slug: "specialty",
    name: "Specialty",
    tagline: "Application-specific polymers",
    description:
      "Specialty polymers for cable insulation, barrier and compostable films and other niche uses.",
    icon: "specialty",
    applications: ["Cable & insulation", "Barrier film", "Compostable film"],
  },
];

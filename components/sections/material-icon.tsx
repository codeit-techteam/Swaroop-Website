import {
  Atom,
  Droplets,
  FlaskConical,
  Fuel,
  Gem,
  Hexagon,
  Layers,
  Palette,
  Recycle,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { MaterialGroup } from "@/content/materials";

const ICONS: Record<MaterialGroup["icon"], LucideIcon> = {
  polymers: Hexagon,
  compounds: Layers,
  masterbatch: Palette,
  elastomers: Waves,
  chemicals: FlaskConical,
  solvents: Droplets,
  intermediates: Atom,
  recycled: Recycle,
  "base-oils": Fuel,
  specialty: Gem,
};

export function MaterialIcon({ icon, className }: { icon: MaterialGroup["icon"]; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon aria-hidden="true" className={className} />;
}

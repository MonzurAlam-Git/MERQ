export type ProductCategory =
  | "outerwear"
  | "tailoring"
  | "knitwear"
  | "shirts"
  | "dresses"
  | "accessories";

export type ProductBadge = "bestseller" | "new";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  variants: string[];
  sizes: string[];
  badge?: ProductBadge; // ← ? means optional — not every product has one
  slug: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oversized Structured Coat",
    category: "outerwear",
    price: 980,
    variants: ["Onyx", "Smoke", "Dune"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "bestseller",
    slug: "oversized-structured-coat",
  },
  {
    id: 2,
    name: "Raw-Edge Wool Overcoat",
    category: "outerwear",
    price: 1100,
    variants: ["Pitch", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    badge: "new",
    slug: "raw-edge-wool-overcoat",
  },
  {
    id: 3,
    name: "Cocoon Leather Jacket",
    category: "outerwear",
    price: 1350,
    variants: ["Onyx", "Tobacco"],
    sizes: ["XS", "S", "M", "L"],
    slug: "cocoon-leather-jacket",
  },
  {
    id: 4,
    name: "Deconstructed Field Coat",
    category: "outerwear",
    price: 860,
    variants: ["Ash", "Sand", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "deconstructed-field-coat",
  },
  {
    id: 5,
    name: "Architectural Blazer",
    category: "tailoring",
    price: 720,
    variants: ["Onyx", "Dune", "Smoke"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "bestseller",
    slug: "architectural-blazer",
  },
  {
    id: 6,
    name: "Wide-Leg Precision Trouser",
    category: "tailoring",
    price: 420,
    variants: ["Onyx", "Ash", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "wide-leg-precision-trouser",
  },
  {
    id: 7,
    name: "Deconstructed Suit Jacket",
    category: "tailoring",
    price: 850,
    variants: ["Smoke", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    badge: "new",
    slug: "deconstructed-suit-jacket",
  },
  {
    id: 8,
    name: "Knife-Pleat Trouser",
    category: "tailoring",
    price: 385,
    variants: ["Onyx", "Slate", "Sand"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "knife-pleat-trouser",
  },
  {
    id: 9,
    name: "Heavyweight Cotton Turtleneck",
    category: "knitwear",
    price: 195,
    variants: ["Onyx", "Ivory", "Ash"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "bestseller",
    slug: "heavyweight-cotton-turtleneck",
  },
  {
    id: 10,
    name: "Merino Structured Cardigan",
    category: "knitwear",
    price: 310,
    variants: ["Smoke", "Dune", "Ivory"],
    sizes: ["XS", "S", "M", "L"],
    slug: "merino-structured-cardigan",
  },
  {
    id: 11,
    name: "Ribbed Mock-Neck Sweater",
    category: "knitwear",
    price: 225,
    variants: ["Onyx", "Ash", "Stone"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "new",
    slug: "ribbed-mock-neck-sweater",
  },
  {
    id: 12,
    name: "Cashmere Boxy Crewneck",
    category: "knitwear",
    price: 380,
    variants: ["Ivory", "Smoke", "Bronze"],
    sizes: ["XS", "S", "M", "L"],
    slug: "cashmere-boxy-crewneck",
  },
  {
    id: 13,
    name: "Asymmetric Linen Shirt",
    category: "shirts",
    price: 185,
    variants: ["Ivory", "Dune", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "asymmetric-linen-shirt",
  },
  {
    id: 14,
    name: "Cotton Poplin Banded Shirt",
    category: "shirts",
    price: 165,
    variants: ["Ivory", "Onyx", "Ash"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "bestseller",
    slug: "cotton-poplin-banded-shirt",
  },
  {
    id: 15,
    name: "Oversized Oxford Shirt",
    category: "shirts",
    price: 175,
    variants: ["Ivory", "Stone", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "oversized-oxford-shirt",
  },
  {
    id: 16,
    name: "Elongated Wool Column Dress",
    category: "dresses",
    price: 520,
    variants: ["Onyx", "Smoke", "Dune"],
    sizes: ["XS", "S", "M", "L"],
    badge: "new",
    slug: "elongated-wool-column-dress",
  },
  {
    id: 17,
    name: "Minimal Slip Dress",
    category: "dresses",
    price: 340,
    variants: ["Ivory", "Ash", "Bronze"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "minimal-slip-dress",
  },
  {
    id: 18,
    name: "Draped Jersey Maxi",
    category: "dresses",
    price: 395,
    variants: ["Onyx", "Slate"],
    sizes: ["XS", "S", "M", "L"],
    badge: "bestseller",
    slug: "draped-jersey-maxi",
  },
  {
    id: 19,
    name: "Leather Structured Tote",
    category: "accessories",
    price: 520,
    variants: ["Onyx", "Tobacco", "Dune"],
    sizes: ["One size"],
    badge: "new",
    slug: "leather-structured-tote",
  },
  {
    id: 20,
    name: "Bronze-Clasp Leather Belt",
    category: "accessories",
    price: 155,
    variants: ["Onyx", "Tan"],
    sizes: ["XS/S", "M/L", "XL"],
    slug: "bronze-clasp-leather-belt",
  },
];

// Lookup map: variant name → swatch color
export const VARIANT_COLORS: Record<string, string> = {
  Onyx: "#111010",
  Smoke: "#3A3830",
  Dune: "#C4B49A",
  Pitch: "#1E1C18",
  Charcoal: "#2D2D2D",
  Tobacco: "#7B5C3A",
  Ash: "#7A7468",
  Sand: "#D4C9B0",
  Slate: "#6B7280",
  Ivory: "#E8E4DE",
  Stone: "#8A8480",
  Bronze: "#D4A853",
  Tan: "#C4A882",
};

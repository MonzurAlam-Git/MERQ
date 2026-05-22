// lib/products.ts — add at the bottom

import type { Product as PrismaProduct } from "@prisma/client";

// The shape of a product as it comes back from the database
export type DbProduct = Omit<PrismaProduct, "images" | "price"> & {
  price: number; // still in cents from DB
  images: Record<string, string>; // cast from Prisma JsonValue
  priceFormatted: string; // e.g. "$980"
};

// Converts a raw Prisma product to a usable DbProduct
export function formatProduct(p: PrismaProduct): DbProduct {
  return {
    ...p,
    images: p.images as Record<string, string>,
    priceFormatted: `$${(p.price / 100).toLocaleString()}`,
  };
}

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
  priceFormatted: string; // e.g. "$980"
  variants: string[];
  sizes: string[];
  badge?: ProductBadge;
  slug: string;
  images: Record<string, string>; // { "Onyx": "url", "Smoke": "url" }
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oversized Structured Coat",
    category: "outerwear",
    price: 980,
    priceFormatted: "$980",
    variants: ["Onyx", "Smoke", "Dune"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "bestseller",
    slug: "oversized-structured-coat",
    images: {
      Onyx: "https://i.ibb.co/xSKVY50y/product-01-onyx.jpg",
      Smoke: "https://i.ibb.co/8gJg0JfY/product-01-smoke.jpg",
      Dune: "https://i.ibb.co/tpwQmdW2/product-01-dune.jpg",
    },
  },
  {
    id: 2,
    name: "Raw-Edge Wool Overcoat",
    category: "outerwear",
    price: 1100,
    priceFormatted: "$1,100",
    variants: ["Pitch", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    badge: "new",
    slug: "raw-edge-wool-overcoat",
    images: {
      Pitch: "https://i.ibb.co/JRRyDqd7/product-02-pitch.jpg",
      Charcoal: "https://i.ibb.co/qYFRbybZ/product-02-charcoal.jpg",
    },
  },
  {
    id: 3,
    name: "Cocoon Leather Jacket",
    category: "outerwear",
    price: 1350,
    priceFormatted: "$1,350",
    variants: ["Onyx", "Tobacco"],
    sizes: ["XS", "S", "M", "L"],
    slug: "cocoon-leather-jacket",
    images: {
      Onyx: "https://i.ibb.co/7N4vZnJr/product-03-onyx.jpg",
      Tobacco: "https://i.ibb.co/5gwRLmZ5/product-03-tobacco.jpg",
    },
  },
  {
    id: 4,
    name: "Deconstructed Field Coat",
    category: "outerwear",
    price: 860,
    priceFormatted: "$860",
    variants: ["Ash", "Sand", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "deconstructed-field-coat",
    images: {
      Ash: "https://i.ibb.co/jXnDjsh/product-04-ash.jpg",
      Sand: "https://i.ibb.co/FkKXQZcm/product-04-sand.jpg",
      Slate: "https://i.ibb.co/W4Vkx6WD/product-04-slate.jpg",
    },
  },
  {
    id: 5,
    name: "Architectural Blazer",
    category: "tailoring",
    price: 720,
    priceFormatted: "$720",
    variants: ["Onyx", "Dune", "Smoke"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "bestseller",
    slug: "architectural-blazer",
    images: {
      Onyx: "https://i.ibb.co/d4HHwtvn/product-05-onyx.jpg",
      Dune: "https://i.ibb.co/2YYYkBwS/product-05-dune.jpg",
      Smoke: "https://i.ibb.co/hF29D7zR/product-05-smoke.jpg",
    },
  },
  {
    id: 6,
    name: "Wide-Leg Precision Trouser",
    category: "tailoring",
    price: 420,
    priceFormatted: "$420",
    variants: ["Onyx", "Ash", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "wide-leg-precision-trouser",
    images: {
      Onyx: "https://i.ibb.co/zhdpDgTG/product-06-onyx.jpg",
      Ash: "https://i.ibb.co/CKhkmZdw/product-06-ash.jpg",
      Ivory: "https://i.ibb.co/RT50K7QP/product-06-ivory.jpg",
    },
  },
  {
    id: 7,
    name: "Deconstructed Suit Jacket",
    category: "tailoring",
    price: 850,
    priceFormatted: "$850",
    variants: ["Smoke", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    badge: "new",
    slug: "deconstructed-suit-jacket",
    images: {
      Smoke: "https://i.ibb.co/d0PKnhYw/product-07-smoke.jpg",
      Charcoal: "https://i.ibb.co/KpPmvsCN/product-07-charcoal.jpg",
    },
  },
  {
    id: 8,
    name: "Knife-Pleat Trouser",
    category: "tailoring",
    price: 385,
    priceFormatted: "$385",
    variants: ["Onyx", "Slate", "Sand"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "knife-pleat-trouser",
    images: {
      Onyx: "https://i.ibb.co/kVLPXPdZ/product-08-onyx.jpg",
      Slate: "https://i.ibb.co/0vC9vT0/product-08-slate.jpg",
      Sand: "https://i.ibb.co/95M174Y/product-08-sand.jpg",
    },
  },
  {
    id: 9,
    name: "Heavyweight Cotton Turtleneck",
    category: "knitwear",
    price: 195,
    priceFormatted: "$195",
    variants: ["Onyx", "Ivory", "Ash"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "bestseller",
    slug: "heavyweight-cotton-turtleneck",
    images: {
      Onyx: "https://i.ibb.co/t9H34pF/product-09-onyx.jpg",
      Ivory: "https://i.ibb.co/ZRtQ6kF1/product-09-ivory.jpg",
      Ash: "https://i.ibb.co/3YcSG9dT/product-09-ash.jpg",
    },
  },
  {
    id: 10,
    name: "Merino Structured Cardigan",
    category: "knitwear",
    price: 310,
    priceFormatted: "$310",
    variants: ["Smoke", "Dune", "Ivory"],
    sizes: ["XS", "S", "M", "L"],
    slug: "merino-structured-cardigan",
    images: {
      Smoke: "https://i.ibb.co/DPLLX6q6/product-10-smoke.jpg",
      Dune: "https://i.ibb.co/gLjrnnzZ/product-10-dune.jpg",
      Ivory: "https://i.ibb.co/mC4zs9FS/product-10-ivory.jpg",
    },
  },
  {
    id: 11,
    name: "Ribbed Mock-Neck Sweater",
    category: "knitwear",
    price: 225,
    priceFormatted: "$225",
    variants: ["Onyx", "Ash", "Stone"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "new",
    slug: "ribbed-mock-neck-sweater",
    images: {
      Onyx: "https://i.ibb.co/pjJRWWBz/product-11-onyx.jpg",
      Ash: "https://i.ibb.co/2Y0TvNvf/product-11-ash.jpg",
      Stone: "https://i.ibb.co/WNbFmTy4/product-11-stone.jpg",
    },
  },
  {
    id: 12,
    name: "Cashmere Boxy Crewneck",
    category: "knitwear",
    price: 380,
    priceFormatted: "$380",
    variants: ["Ivory", "Smoke", "Bronze"],
    sizes: ["XS", "S", "M", "L"],
    slug: "cashmere-boxy-crewneck",
    images: {
      Ivory: "https://i.ibb.co/C3r5hzZY/product-12-ivory.jpg",
      Smoke: "https://i.ibb.co/d4TQ9Ds6/product-12-smoke.jpg",
      Bronze: "https://i.ibb.co/xwscNgd/product-12-bronze.jpg",
    },
  },
  {
    id: 13,
    name: "Asymmetric Linen Shirt",
    category: "shirts",
    price: 185,
    priceFormatted: "$185",
    variants: ["Ivory", "Dune", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "asymmetric-linen-shirt",
    images: {
      Ivory: "https://i.ibb.co/qHfqhSC/product-13-ivory.jpg",
      Dune: "https://i.ibb.co/Ng0kJMk3/product-13-dune.jpg",
      Slate: "https://i.ibb.co/LzY8MmNW/product-13-slate.jpg",
    },
  },
  {
    id: 14,
    name: "Cotton Poplin Banded Shirt",
    category: "shirts",
    price: 165,
    priceFormatted: "$165",
    variants: ["Ivory", "Onyx", "Ash"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "bestseller",
    slug: "cotton-poplin-banded-shirt",
    images: {
      Ivory: "https://i.ibb.co/LdrzJtBR/product-14-ivory.jpg",
      Onyx: "https://i.ibb.co/PGf8G7N3/product-14-onyx.jpg",
      Ash: "https://i.ibb.co/hJQ0DDy6/product-14-ash.jpg",
    },
  },
  {
    id: 15,
    name: "Oversized Oxford Shirt",
    category: "shirts",
    price: 175,
    priceFormatted: "$175",
    variants: ["Ivory", "Stone", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "oversized-oxford-shirt",
    images: {
      Ivory: "https://i.ibb.co/FLLsYHYm/product-15-ivory.jpg",
      Stone: "https://i.ibb.co/Cp0j16gN/product-15-stone.jpg",
      Slate: "https://i.ibb.co/qYGfYcdf/product-15-slate.jpg",
    },
  },
  {
    id: 16,
    name: "Elongated Wool Column Dress",
    category: "dresses",
    price: 520,
    priceFormatted: "$520",
    variants: ["Onyx", "Smoke", "Dune"],
    sizes: ["XS", "S", "M", "L"],
    badge: "new",
    slug: "elongated-wool-column-dress",
    images: {
      Onyx: "https://i.ibb.co/HDQ6N2zy/product-16-onyx.jpg",
      Smoke: "https://i.ibb.co/MxB4Dyq1/product-16-smoke.jpg",
      Dune: "https://i.ibb.co/W4S2Yn96/product-16-dune.jpg",
    },
  },
  {
    id: 17,
    name: "Minimal Slip Dress",
    category: "dresses",
    price: 340,
    priceFormatted: "$340",
    variants: ["Ivory", "Ash", "Bronze"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slug: "minimal-slip-dress",
    images: {
      Ivory: "https://i.ibb.co/JwbXBpS8/product-17-ivory.jpg",
      Ash: "https://i.ibb.co/sYF6x0W/product-17-ash.jpg",
      Bronze: "https://i.ibb.co/0y9J7Pgb/product-17-bronze.jpg",
    },
  },
  {
    id: 18,
    name: "Draped Jersey Maxi",
    category: "dresses",
    price: 395,
    priceFormatted: "$395",
    variants: ["Onyx", "Slate"],
    sizes: ["XS", "S", "M", "L"],
    badge: "bestseller",
    slug: "draped-jersey-maxi",
    images: {
      Onyx: "https://i.ibb.co/7tsdYK6S/product-18-onyx.jpg",
      Slate: "https://i.ibb.co/FkK8j8Dv/product-18-slate.jpg",
    },
  },
  {
    id: 19,
    name: "Leather Structured Tote",
    category: "accessories",
    price: 520,
    priceFormatted: "$520",
    variants: ["Onyx", "Tobacco", "Dune"],
    sizes: ["One size"],
    badge: "new",
    slug: "leather-structured-tote",
    images: {
      Onyx: "https://i.ibb.co/4R7XzYxq/product-19-onyx.jpg",
      Tobacco: "https://i.ibb.co/TxSyXpff/product-19-tobacco.jpg",
      Dune: "https://i.ibb.co/5ZfQ8NN/product-19-dune.jpg",
    },
  },
  {
    id: 20,
    name: "Bronze-Clasp Leather Belt",
    category: "accessories",
    price: 155,
    priceFormatted: "$155",
    variants: ["Onyx", "Tan"],
    sizes: ["XS/S", "M/L", "XL"],
    slug: "bronze-clasp-leather-belt",
    images: {
      Onyx: "https://i.ibb.co/j9YRRNYm/product-20-onyx.jpg",
      Tan: "https://i.ibb.co/DDhvyPfj/product-20-tan.jpg",
    },
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

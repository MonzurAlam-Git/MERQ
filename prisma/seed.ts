// prisma/seed.ts
import { neon } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

const products = [
  {
    id: 1,
    name: "Oversized Structured Coat",
    category: "outerwear",
    price: 98000,
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
    price: 110000,
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
    price: 135000,
    variants: ["Onyx", "Tobacco"],
    sizes: ["XS", "S", "M", "L"],
    badge: null,
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
    price: 86000,
    variants: ["Ash", "Sand", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: null,
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
    price: 72000,
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
    price: 42000,
    variants: ["Onyx", "Ash", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: null,
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
    price: 85000,
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
    price: 38500,
    variants: ["Onyx", "Slate", "Sand"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: null,
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
    price: 19500,
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
    price: 31000,
    variants: ["Smoke", "Dune", "Ivory"],
    sizes: ["XS", "S", "M", "L"],
    badge: null,
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
    price: 22500,
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
    price: 38000,
    variants: ["Ivory", "Smoke", "Bronze"],
    sizes: ["XS", "S", "M", "L"],
    badge: null,
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
    price: 18500,
    variants: ["Ivory", "Dune", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: null,
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
    price: 16500,
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
    price: 17500,
    variants: ["Ivory", "Stone", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: null,
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
    price: 52000,
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
    price: 34000,
    variants: ["Ivory", "Ash", "Bronze"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: null,
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
    price: 39500,
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
    price: 52000,
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
    price: 15500,
    variants: ["Onyx", "Tan"],
    sizes: ["XS/S", "M/L", "XL"],
    badge: null,
    slug: "bronze-clasp-leather-belt",
    images: {
      Onyx: "https://i.ibb.co/j9YRRNYm/product-20-onyx.jpg",
      Tan: "https://i.ibb.co/DDhvyPfj/product-20-tan.jpg",
    },
  },
];

async function main() {
  console.log("Seeding products...");

  for (const product of products) {
    await db.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  console.log("Done. 20 products seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

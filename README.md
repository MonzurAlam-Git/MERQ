# MERQ

> *Nothing excess. Nothing missing.*

A dark avant-garde luxury unisex clothing store. Built with Next.js 15 App Router as a full-stack portfolio project.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | NextAuth v5 |
| Database | PostgreSQL + Prisma (Neon DB) |
| Payments | Stripe (Payment Intents API) |
| Images | Cloudinary |
| State | Zustand |
| AI | Vercel AI SDK + Anthropic Claude |
| Animation | Framer Motion |
| Deployment | Vercel |

---

## Features

- Product catalog — search, URL-based filters, pagination
- Product detail — image gallery, size/color variants, stock badge
- Shopping cart — persistent, quantity control, subtotal
- Wishlist — per-user, synced to database
- Auth — Google OAuth + email/password
- Stripe checkout with order confirmation
- Order history per user
- Product reviews — star rating + comment, average score
- Admin dashboard — CRUD products, view orders, role-guarded
- AI chat assistant — streaming, catalog-aware, suggested prompts
- Dark mode default with toggle
- SEO — dynamic metadata, OG images, sitemap
- Framer Motion — page transitions, cart drawer, hover states
- Lighthouse 90+

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon DB recommended)
- Accounts: Stripe, Cloudinary, Google OAuth credentials

### Install

```bash
git clone https://github.com/your-username/merq.git
cd merq
npm install
```

### Environment variables

Create `.env.local` at the project root:

```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Anthropic
ANTHROPIC_API_KEY=
```

### Database setup

```bash
npx prisma migrate dev
npx prisma db seed
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
merq/
├── app/
│   ├── (auth)/              # Login, register pages
│   ├── (shop)/              # Product catalog, detail pages
│   ├── cart/
│   ├── checkout/
│   ├── account/             # Orders, wishlist, profile
│   ├── admin/               # Dashboard, product CRUD
│   ├── api/                 # Route handlers (auth, webhooks, chat)
│   └── layout.tsx
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── product/             # ProductCard, ProductGrid, Gallery
│   ├── cart/                # CartDrawer, CartItem
│   └── chat/                # AI assistant
├── lib/
│   ├── prisma.ts
│   ├── stripe.ts
│   └── cloudinary.ts
├── store/                   # Zustand — cart, wishlist
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── public/
```

---

## Design Tokens

| Token | Hex | Usage |
|---|---|---|
| Onyx | `#111010` | Page background |
| Pitch | `#1E1C18` | Cards / surfaces |
| Smoke | `#3A3830` | Borders |
| Ash | `#7A7468` | Body text |
| Ivory | `#E8E4DE` | Headings / CTAs |
| Bronze | `#D4A853` | Accent — use sparingly |

Typography: **Cormorant Garamond** (display) · system sans (UI/body)

---



## Catalog

20 SKUs across outerwear, tailoring, knitwear, shirts, dresses, and accessories. Prices from $155 to $1,350. All products support color and size variants.

---

## License

MIT

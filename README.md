# XYZ Marketplace — Next.js starter

Purple-themed general e-commerce storefront scaffold for Bangladesh. It includes responsive storefront UI, category/search filtering, wishlist interaction, a demo cart, an admin dashboard UI, Supabase client helpers, and an initial SQL schema.

## Important status

This is the **starter code**, not a live store yet:
- Products in the storefront are demo data in `app/page.tsx`.
- Cart state is browser-memory only.
- Checkout/payment is intentionally not wired up.
- `/admin` is a UI scaffold and is **not authenticated**. Do not use it for real business/customer data until Supabase Auth and server-side authorization are implemented.
- SQL intentionally does not give public users permission to create orders or administer data.

## 1. Run locally

Install Node.js 20+ (LTS recommended), unzip this folder, then run:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The storefront can be viewed without Supabase environment values, but Supabase helper functions will require `.env.local` values when used.

## 2. Create Supabase project

1. Create a project at https://supabase.com.
2. Open **Project Settings → API** and copy the Project URL and publishable/anon key.
3. Put them in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

4. Open **SQL Editor**, run `supabase/schema.sql`.
5. Add products/categories using the Supabase Table Editor for initial testing.

Do not put the service-role key in frontend environment variables or commit `.env.local`.

## 3. Push to GitHub

Create a new empty GitHub repository named `xyz-marketplace`. In this folder:

```bash
git init
git add .
git commit -m "Initial XYZ marketplace starter"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/xyz-marketplace.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## 4. Deploy on Vercel

1. Sign in to https://vercel.com with GitHub.
2. Choose **Add New → Project**, import `xyz-marketplace`.
3. Add the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in Vercel project settings.
4. Deploy. Later pushes to `main` trigger new deployments.

## Next development milestones

1. Supabase Auth with protected admin routes and trusted admin provisioning.
2. Real category/product CRUD, image upload via Supabase Storage, inventory validation.
3. Server-side order creation with authoritative price/stock checks and order item snapshots.
4. Order status workflow, customer history, coupon validation.
5. Bangladesh delivery fee rules and a selected payment provider integration.
6. Tests, metadata/SEO, logging, privacy/terms and production security review.

# QuoteZap — SaaS Paywall (React + Firebase + Stripe)

A simple, fast monetisation layer for QuoteZap (electrical quoting tool). Mobile-first, tradie-friendly UI.

## What’s included
- Landing page with hero, features, benefits, pricing, testimonials
- Auth: email/password via Firebase Auth
- 7-day free trial auto-created on signup (Firestore)
- Paywall and subscription gating
- Dashboard with trial countdown and status
- Protected app route (Quote Builder demo)
- Stripe checkout redirect (configure backend for production)
- Success/Cancel pages that mark subscription active in Firestore (demo)

## File structure
```
src/
  components/
    layout/Header.tsx
    ui/Button.tsx
    ui/Input.tsx
    ProtectedRoute.tsx
  context/AuthContext.tsx
  pages/
    Landing.tsx
    Login.tsx
    Register.tsx
    Dashboard.tsx
    Paywall.tsx
    QuoteApp.tsx
    Success.tsx
    Cancel.tsx
  utils/
    cn.ts
    stripe.ts
  firebase.ts
  App.tsx
  main.tsx
  index.css
  vite-env.d.ts
```

## Setup
1. Install deps
```bash
npm install
```

Already added:
- `react-router-dom`, `firebase`

2. Environment variables
Copy `.env.example` to `.env` and fill values.

Firebase:
- Create project at console.firebase.google.com
- Enable Authentication > Email/Password
- Create Firestore database (test mode to start)
- Add web app, copy config into `.env`

Stripe (test mode):
- Create account at dashboard.stripe.com
- Create Product: “QuoteZap Pro” recurring AUD $19/month
- Copy Price ID (price_xxx) and Publishable key (pk_test_xxx) to `.env`

3. Run locally
```bash
npm run dev
```
Open http://localhost:5173

## Firestore structure
Collection: `users`
Doc id: Firebase Auth UID
Fields:
- email: string
- trialStart: timestamp
- trialEnd: timestamp
- subscriptionStatus: "trial" | "active" | "expired" | "none"
- stripeCustomerId?: string
- stripeSubscriptionId?: string
- createdAt, updatedAt: timestamps

## Routes
- `/` Landing
- `/login` Login
- `/register` Sign up (creates 7-day trial)
- `/dashboard` Subscription status, buttons
- `/paywall` Shown when trial expired / no subscription
- `/app` Protected quote builder (requires trial or active)
- `/success` Stripe return (demo marks active)
- `/cancel` Stripe cancel

## Stripe integration (production)
The current `src/utils/stripe.ts` uses a placeholder for simplicity. For production:

1. Create backend endpoint (e.g., Netlify Function or Firebase Function) that:
   - Creates/looks up Stripe Customer
   - Creates Checkout Session:
     ```js
     session = await stripe.checkout.sessions.create({
       mode: 'subscription',
       line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
       success_url: 'https://yourapp.netlify.app/success?session_id={CHECKOUT_SESSION_ID}',
       cancel_url: 'https://yourapp.netlify.app/cancel',
       customer_email: email,
       client_reference_id: uid,
     })
     ```
   - Returns `session.url`

2. From frontend, call your endpoint and redirect to `session.url`.

3. Set up Stripe webhook to handle:
   - `checkout.session.completed` → set user `subscriptionStatus = "active"`, store customer & subscription IDs
   - `invoice.payment_failed` / `customer.subscription.deleted` → mark expired/cancelled

## Netlify deploy
1. Push repo to GitHub
2. Netlify: New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add Environment Variables in Netlify (same as `.env`)
6. Deploy

## Testing the flow
- Register new account → redirects to dashboard → trial active
- Click “Open QuoteZap App” → access granted
- Simulate expiry: in Firestore set `trialEnd` to past date or change `subscriptionStatus` to `expired`
- Visit `/app` → redirected to `/paywall`
- Click “Upgrade” → (configure Stripe) → after success, `/success` marks active
- Revisit `/app` → access granted

## Notes
- This demo stores subscription status in Firestore. For real use, rely on Stripe webhooks as source of truth.
- Keep UI simple: big buttons, clear labels, mobile-first.
- Trial countdown shown as “X days remaining” in dashboard.
- Session persistence handled by Firebase Auth.
- Error handling included on login/register forms.

## Security
- Add Firestore rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

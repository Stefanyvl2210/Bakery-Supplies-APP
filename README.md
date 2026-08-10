# Bakery Supplies APP

Frontend application for the Bakery Supplies online store. It is built with React and Vite and consumes the Bakery Supplies Laravel REST API.

## Current features

### Storefront and catalog

- Home page with links to the main catalog areas.
- Product catalog with category navigation, search, filtering, and paginated loading.
- Product details with availability information.
- Stock-aware shopping cart with quantity updates and item removal.

### Authentication and customer account

- Customer registration and email verification.
- Verification email resend.
- Login and logout with Bearer Token authentication.
- Forgot-password and password-reset flows.
- Profile management.
- Address listing, creation, and removal.
- Customer-only and administrator-only route guards.

### Checkout and orders

- Checkout for authenticated customers and guests.
- Delivery and store-pickup options.
- Payment methods loaded from the API.
- Transfer reference and payment-proof upload when required.
- Customer order history and order details.
- Guest order tracking with a secure tracking token.

### Administration

- Dashboard statistics.
- Product creation, editing, listing, and deletion.
- Hierarchical category creation, editing, listing, and deletion.
- Payment method creation, editing, listing, and deletion.
- Order search and payment review for transfers and cash payments.
- Order fulfillment workflow for shipping, pickup readiness, and delivery.
- Administrative activity logs.

## Tech stack

- React 18 and Vite 8.
- Material UI 5 and `@mui/styles`.
- Redux Toolkit with `redux-persist`.
- React Router.
- Axios.
- React Hook Form and Yup.

## Requirements

- Node.js `20.19+` or `22.12+`.
- npm.
- Access to a running Bakery Supplies API.

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure the API URLs:

   ```env
   VITE_BACKEND_URL=http://localhost:8000
   VITE_API_URL=http://localhost:8000/api
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Vite prints the local application URL in the terminal.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm start` | Alias for the development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## API integration

The Axios client is configured in `src/config/axios.js`. API helpers are grouped by resource in `src/helpers/api/`.

Authenticated requests use the token returned by the API:

```http
Authorization: Bearer <token>
```

The current session is restored with `GET /user`. Laravel Resource responses may be returned as `{ data: ... }` or as paginated collections; shared response helpers normalize both formats.

Development API reference: `https://dev.bakery-supplies-api.lc/docs/api`

## Project structure

```text
src/
  app/               Redux store and reducers
  components/        Shared storefront and admin UI
  config/axios.js    Axios client and token handling
  features/          Authentication and cart state
  helpers/api/       API helpers grouped by resource
  helpers/           Formatting, category, stock, and URL utilities
  pages/             Storefront, account, checkout, and admin views
  routing/           Routes and access guards
  theme/             Material UI theme configuration
```

## Validation

There is currently no dedicated test or lint script in `package.json`. Before submitting changes, run:

```bash
npm run build
```

For non-trivial changes, manually verify the affected customer or administrator flow, including loading, empty, validation, and API error states.

## Security notes

- Never place secrets in frontend code or environment files committed to Git.
- The browser stores only the API token required by the published Bearer Token flow.
- The backend is the source of truth for validation, permissions, stock, order totals, and order status.
- Administrator pages are protected by role-based route guards.
- Payment proofs must be images accepted by the backend and must not exceed its upload limit.
- Keep `.env` local; commit only safe defaults in `.env.example`.

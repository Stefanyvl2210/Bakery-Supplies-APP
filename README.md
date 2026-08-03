# Bakery Supplies APP

React/Vite frontend for Bakery Supplies. The app consumes the Bakery Supplies REST API for catalog browsing, shopping cart, authenticated and guest checkout, orders, payments, profile management, addresses, and administration.

## Requirements

- Node.js compatible with Vite 8.
- npm.
- Bakery Supplies API running locally or in the published development environment.

Published development API:

- API docs: `https://dev.bakery-supplies-api.lc/docs/api`
- API base URL: `https://dev.bakery-supplies-api.lc/api`

## Installation

```bash
npm install
```

Create a local `.env` file from `.env.example`.

Development API example:

```env
VITE_BACKEND_URL=https://dev.bakery-supplies-api.lc
VITE_API_URL=https://dev.bakery-supplies-api.lc/api
```

Local API example:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_API_URL=http://localhost:8000/api
```

## Development

```bash
npm run dev
```

Vite will print the local app URL in the terminal.

## Production build

```bash
npm run build
```

The production output is generated in `dist/`.

## API integration

The frontend is wired to the published Laravel API using Bearer Token authentication.

Connected areas:

- Authentication:
  - login
  - register
  - logout
  - email verification
  - resend verification code
  - forgot password
  - reset password
- Catalog:
  - products
  - categories
- Checkout:
  - authenticated checkout
  - guest checkout
  - delivery or pickup
  - active payment methods
  - transfer reference and payment proof upload
- Account:
  - profile
  - addresses
  - customer orders
  - available payment methods
- Admin:
  - dashboard stats
  - products
  - categories
  - orders
  - payment workflow actions
  - payment methods
  - user logs

## Authentication

The API uses Bearer Token authentication:

```http
Authorization: Bearer <token>
```

The current user is loaded with:

```http
GET /user
```

The token is stored in browser storage because the published API documents Bearer Token auth rather than httpOnly cookie sessions.

## Project structure

```text
src/
  components/        Shared UI components
  config/axios.js    Axios client and auth token handling
  features/          Redux slices
  helpers/api/       API helpers by backend resource
  helpers/           Formatting and response utilities
  pages/             Public, account, checkout, and admin views
  routing/           Routes and route guards
```

## Testing checklist

Before shipping changes, run:

```bash
npm run build
```

Manual flows to verify:

1. Register a customer.
2. Verify email.
3. Log in.
4. Browse products and categories.
5. Add products to the cart.
6. Complete authenticated checkout.
7. Complete guest checkout.
8. Track a guest order by token.
9. View customer orders.
10. Update profile and addresses.
11. Log in as admin.
12. Review admin dashboard stats.
13. Manage products and categories.
14. Manage payment methods.
15. Review admin orders and payment actions.
16. Review logs.

## Security notes

- Do not store secrets in the frontend.
- Do not send calculated order totals or order statuses from the frontend; the backend calculates and owns them.
- Admin routes are protected by the `admin` role guard.
- Payment proof files are uploaded to the backend and must pass backend validation.
- Keep `.env` local and commit only safe examples in `.env.example`.

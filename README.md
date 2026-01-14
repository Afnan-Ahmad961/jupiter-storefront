# Medusa Next.js Starter Template

This storefront combines Medusa's powerful commerce backend with a performant Next.js frontend. This document provides a walkthrough of how the storefront handles data and connects to the Medusa backend.

## Data Flow and Backend Connection

The storefront communicates with the Medusa backend through a REST API. The base URL for the API is defined in the `MEDUSA_BACKEND_URL` environment variable. The storefront uses the Medusa JS client to interact with the API, simplifying data fetching, cart management, and checkout.

### Key Concepts

- **Regions**: Medusa supports multiple regions, each with its own currency, tax rates, and shipping options. The storefront uses middleware to determine the user's region based on their IP address or URL and sets a cookie to persist the region. The default region can be configured in the middleware.
- **Products**: Products are fetched from the Medusa backend and displayed on the product listing and detail pages. The storefront uses Next.js's data fetching capabilities to retrieve product data, which is then cached for performance.
- **Collections**: Products can be organized into collections, which are also fetched from the backend and displayed on a dedicated collections page.
- **Cart**: The storefront uses the Medusa JS client to manage the user's cart. The cart is stored in the Medusa backend and is associated with the user's session.
- **Checkout**: The checkout process is handled by the Medusa backend. The storefront guides the user through the checkout flow, collecting shipping and payment information, and then submits the order to the backend for processing.
- **User Accounts**: The storefront provides user account functionality, allowing users to create accounts, view their order history, and manage their profile.

### Middleware

The `src/middleware.ts` file is responsible for the following:

- **Region Detection**: It determines the user's region based on their IP address (using the `x-vercel-ip-country` header) or the URL (`/us`, `/de`, etc.).
- **Cookie Management**: It sets a cookie to store the user's selected region, ensuring a consistent experience across sessions.
- **URL Rewriting**: It rewrites the URL to include the region, making the storefront's pages statically optimized for each region.

### Data Fetching

The storefront uses a combination of server-side and client-side data fetching:

- **Server-Side Rendering (SSR)**: Pages that require fresh data on every request, such as the cart and checkout pages, are server-side rendered.
- **Static Site Generation (SSG)**: Pages that can be pre-built, such as product and collection pages, are statically generated at build time.
- **Client-Side Fetching**: The storefront uses client-side fetching to update data dynamically, such as when a user adds a product to their cart.

### Backend Connection

The Medusa JS client is configured in `src/lib/medusa-client.ts`. It uses the `MEDUSA_BACKEND_URL` and `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` environment variables to connect to the Medusa backend. The client provides a simple and consistent way to interact with the Medusa API, abstracting away the complexities of making HTTP requests.

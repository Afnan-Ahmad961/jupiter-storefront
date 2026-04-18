# Jupiter Storefront - Medusa Next.js Starter Template

This storefront serves as the e-commerce frontend for Jupiter, combining Medusa's powerful commerce backend with a performant Next.js application. This document provides an in-depth walkthrough of the storefront's architecture, how it handles data, and its connection to the Medusa backend.

## Project Architecture

The Jupiter storefront is built on a modern Jamstack-inspired architecture, leveraging Next.js for the frontend and Medusa as the headless commerce engine.

-   **Frontend (Next.js)**: Developed using Next.js, this layer is responsible for the user interface, routing, and overall user experience. It utilizes React for building interactive components and benefits from Next.js's capabilities for Server-Side Rendering (SSR), Static Site Generation (SSG), and client-side data fetching to optimize performance and SEO.
-   **Backend (Medusa)**: This is a headless commerce engine that provides all the core e-commerce functionalities, including product management, cart and checkout flows, order processing, customer accounts, and multi-region support. The storefront communicates with the Medusa backend exclusively through its REST API.
-   **API Communication**: The storefront interacts with the Medusa backend via its REST API. The Medusa JS client (`src/lib/medusa-client.ts`) is used to simplify these interactions, abstracting away the complexities of HTTP requests and providing a consistent way to manage data related to products, carts, and checkout. The base URL for the API is defined by the `MEDUSA_BACKEND_URL` environment variable.

## Data Flow and Backend Connection

The storefront communicates with the Medusa backend through its REST API. The base URL for the API is defined in the `MEDUSA_BACKEND_URL` environment variable. The storefront uses the Medusa JS client to interact with the API, simplifying data fetching, cart management, and checkout.

### Key Concepts and Modules

-   **Regions**: Medusa is designed for multi-regional support, allowing different currencies, tax rates, and shipping options per region. The storefront intelligently determines the user's region, primarily through the `src/middleware.ts` file, and persists this selection using a cookie for a consistent user experience.
-   **Products**: Products are dynamically fetched from the Medusa backend. The storefront uses Next.js's data fetching mechanisms to display products on listing and detail pages, employing caching strategies for optimal performance. Product data and related utilities are managed within `src/lib/data/products.ts` and `src/lib/util/product.ts`.
-   **Collections**: Products are organized into collections, which are also fetched from the backend and presented on dedicated collection pages.
-   **Cart**: The Medusa JS client manages the user's shopping cart. Cart data is stored and managed within the Medusa backend, linked to the user's session. Cart-related logic can be found in `src/lib/data/cart.ts` and `src/modules/cart/`.
-   **Checkout**: The entire checkout process is facilitated by the Medusa backend. The storefront guides the user through collecting shipping and payment information before submitting the order to the backend for processing. See `src/modules/checkout/` for implementation details.
-   **User Accounts**: Comprehensive user account functionality is provided, enabling users to create accounts, view order history, and manage their profile details. Related components are located in `src/modules/account/`.

### Middleware (`src/middleware.ts`)

The `src/middleware.ts` file is a critical component for regional routing and user experience. It is responsible for:

-   **Region Detection**: It determines the user's region. This is primarily done by checking the URL for a country code (e.g., `/pk`, `/us`). If no country code is present in the URL, it defaults to the region specified by the `NEXT_PUBLIC_DEFAULT_REGION` environment variable. **In this project, `NEXT_PUBLIC_DEFAULT_REGION` is set to `"pk"` (Pakistan) by default, meaning that if a user accesses the site without a specified country code in the URL, they will be directed to the Pakistan storefront.**
-   **Cookie Management**: It sets and manages a `_medusa_cache_id` cookie to store the user's selected region, ensuring that their regional preference is maintained across sessions.
-   **URL Rewriting**: It rewrites the URL to include the detected or default region, which is crucial for Next.js's static optimization and ensures that pages are correctly served for each region. This helps in maintaining a consistent regional context throughout the user's journey.

### Data Fetching Strategies

The storefront employs a combination of data fetching strategies inherent to Next.js:

-   **Server-Side Rendering (SSR)**: Utilized for pages requiring up-to-the-minute data on every request, such as the cart and checkout pages, ensuring dynamic and personalized content.
-   **Static Site Generation (SSG)**: Applied to pages that can be pre-built at compile time, like product and collection pages. This generates HTML files at build time, leading to extremely fast page loads.
-   **Client-Side Fetching**: Used for dynamic updates and interactions on pages, such as when a user adds an item to their cart without a full page reload, enhancing the responsiveness of the application.

### Backend Connection Configuration

The Medusa JS client, configured in `src/lib/medusa-client.ts`, establishes the connection to the Medusa backend. It relies on the `MEDUSA_BACKEND_URL` and `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` environment variables to securely connect and interact with the Medusa API. This client abstracts the underlying API calls, providing a streamlined interface for data operations.

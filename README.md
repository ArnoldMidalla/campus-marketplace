# Campus Marketplace 🎓🛍️

A vibrant, campus-exclusive marketplace designed to foster a secure and convenient trading environment among university students. Campus Marketplace empowers students to effortlessly buy, sell, and trade items, discover local events, and connect with peers within their trusted university community.

## Features ✨

*   **Secure Student Authentication:** Robust user authentication powered by Supabase, ensuring a verified student community.
*   **Effortless Item Listing:** Intuitive interface for posting items for sale, complete with optimized image uploads via ImageKit and browser-side compression.
*   **Smart Browsing & Discovery:** Advanced filtering and search capabilities to easily find desired products and campus events.
*   **Real-time Communication:** Integrated real-time chat functionality, enabling direct and instant communication between buyers and sellers, facilitated by Supabase Realtime.
*   **Event Listings:** Dedicated section for students to post and discover upcoming campus events.
*   **Responsive & Dynamic UI:** Modern, accessible, and theme-switchable user interface built with Next.js, Tailwind CSS, and shadcn/ui.
*   **Password Management:** Secure flows for password reset and updates.

## Technologies Used 🛠️

| Category      | Technology       | Description                                              | Link                                                                        |
| :------------ | :--------------- | :------------------------------------------------------- | :-------------------------------------------------------------------------- |
| **Framework** | Next.js          | React framework for building full-stack web applications. | [Next.js](https://nextjs.org/)                                              |
| **Language**  | TypeScript       | Statically typed superset of JavaScript.                 | [TypeScript](https://www.typescriptlang.org/)                               |
| **Database**  | Supabase         | Open-source Firebase alternative (PostgreSQL database).  | [Supabase](https://supabase.com/)                                           |
| **Auth**      | Supabase Auth    | User authentication and authorization.                   | [Supabase Auth](https://supabase.com/docs/guides/auth)                      |
| **Realtime**  | Supabase Realtime| Real-time data synchronization for chat.                 | [Supabase Realtime](https://supabase.com/docs/guides/realtime)              |
| **Styling**   | Tailwind CSS     | Utility-first CSS framework.                             | [Tailwind CSS](https://tailwindcss.com/)                                    |
| **Components**| shadcn/ui        | Reusable UI components built with Tailwind CSS.          | [shadcn/ui](https://ui.shadcn.com/)                                         |
| **Image CDN** | ImageKit         | Image optimization and delivery.                         | [ImageKit](https://imagekit.io/)                                            |
| **Utilities** | Zod              | TypeScript-first schema declaration and validation.      | [Zod](https://zod.dev/)                                                     |
| **HTTP Client**| Axios           | Promise-based HTTP client.                               | [Axios](https://axios-http.com/)                                            |
| **Img Comp.** | browser-image-compression | Client-side image compression.                    | [browser-image-compression](https://www.npmjs.com/package/browser-image-compression) |

## Getting Started 🚀

Follow these steps to set up and run the Campus Marketplace project locally.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ArnoldMidalla/campus-marketplace.git
    cd campus-marketplace
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```
3.  **Set up Supabase Project:**
    *   Create a new project on [Supabase](https://app.supabase.com/dashboard/projects).
    *   Obtain your `Project URL` and `Anon Key` from your Supabase project settings (`Settings > API`).
    *   Configure your authentication methods (e.g., Email/Password, Google OAuth).
    *   Set up your redirect URLs in Supabase Auth settings to include `http://localhost:3000/**` and any Vercel preview/production URLs if deploying.
4.  **Set up ImageKit Account:**
    *   Create an account on [ImageKit](https://imagekit.io/).
    *   Obtain your `Public Key`, `Private Key`, and `URL Endpoint` from your ImageKit dashboard.

### Environment Variables

Create a `.env.local` file in the root of your project and populate it with the following variables, using your actual Supabase and ImageKit credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_SUPABASE_PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=[YOUR_IMAGEKIT_PUBLIC_KEY]
IMAGEKIT_PRIVATE_KEY=[YOUR_IMAGEKIT_PRIVATE_KEY]
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/[YOUR_IMAGEKIT_ID]
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage 💡

### User Authentication

1.  **Sign Up:** Navigate to `/auth/sign-up` to create a new account using your email and password, or continue with Google. You will receive an email to confirm your account.
2.  **Log In:** After confirmation, go to `/auth/login` to sign in.
3.  **Forgot Password:** If you forget your password, use the "Forgot your password?" link on the login page to receive a reset email.

### Buying Items

1.  **Browse:** Visit the `/buy` page to see all available items.
2.  **Search & Filter:** Use the search bar to find specific items or the dropdown to filter by university.
3.  **View Details:** Click on an item to view its detailed description, price, condition, and seller information.
4.  **Contact Seller:** On the item detail page, if you're interested, you can contact the seller directly via WhatsApp (for non-owner users) or manage your own listing (if you're the owner).

### Selling Items

1.  **List an Item:** Go to the `/sell` page.
2.  **Fill Details:** Provide the item's name, your university, price, type, a detailed description, and its condition (new/used).
3.  **Upload Image:** Select a high-quality image of your item. The application will compress it for optimal performance.
4.  **List:** Click "List Item" to publish your product on the marketplace.

### Events

1.  **Explore Events:** Visit the `/events` page to see a curated list of campus events.
2.  **Filter Events:** Use the search bar to find specific events or the dropdown to filter by university.

### Realtime Chat

*   The Realtime Chat feature (`components/realtime-chat.tsx`) allows for instant messaging within specific contexts (e.g., when viewing an item to discuss with the seller, though its current integration might vary based on UI). Messages are broadcasted instantly using Supabase Realtime.

---

# Campus Marketplace API

## Overview
This section documents the backend API routes available in the Campus Marketplace application. The primary API is a Next.js Route Handler written in TypeScript, providing secure authentication parameters for direct client-side image uploads to ImageKit, thereby protecting sensitive private keys.

## API Documentation
### Base URL
`/api`

### Endpoints
#### GET /api/imagekit-auth
**Purpose**: Retrieves necessary authentication parameters (signature, expire, token) required for direct image uploads from the client-side to ImageKit. This method securely handles the ImageKit private key on the server, ensuring it is never exposed to the client.

**Request**:
(No request body required)

**Response**:
```json
{
  "signature": "a_generated_signature_string",
  "expire": "an_expiration_timestamp_in_seconds",
  "token": "a_unique_token_string"
}
```

**Errors**:
- `500 Internal Server Error`: Occurs if ImageKit public or private keys are not correctly configured in the server's environment variables (`NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`) or if ImageKit's authentication parameter generation fails.

---

## Author Info 🧑‍💻

**Arnold Midalla**
*   LinkedIn: [linkedin.com/in/ArnoldMidalla](https://www.linkedin.com/in/ArnoldMidalla)
*   Twitter: [@ArnoldMidalla](https://twitter.com/ArnoldMidalla)
*   Portfolio: [your-portfolio.com](https://your-portfolio.com)

---

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcn%2Fui&logoColor=white)](https://ui.shadcn.com/)
[![ImageKit](https://img.shields.io/badge/ImageKit-F00000?style=for-the-badge&logo=imagekit&logoColor=white)](https://imagekit.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID:
      process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID,
    NEXT_PUBLIC_SHOPIFY_AUTH_AUTHORIZE_URL:
      process.env.NEXT_PUBLIC_SHOPIFY_AUTH_AUTHORIZE_URL,
    NEXT_PUBLIC_SHOPIFY_AUTH_TOKEN_URL:
      process.env.NEXT_PUBLIC_SHOPIFY_AUTH_TOKEN_URL,
    NEXT_PUBLIC_SHOPIFY_AUTH_LOGOUT_URL:
      process.env.NEXT_PUBLIC_SHOPIFY_AUTH_LOGOUT_URL,
    NEXT_PUBLIC_SHOPIFY_AUTH_REDIRECT_URI:
      process.env.NEXT_PUBLIC_SHOPIFY_AUTH_REDIRECT_URI,
    NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_URL:
      process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_URL,
  },
  images: {
    domains: [
      "cdn.shopify.com", // Allow images from Shopify CDN
      "worldelegantkp.com", // Allow images from worldelegantkp.com
      "res.cloudinary.com", // Allow images from Cloudinary
    ],
  },
};

// Add debugging
console.log("Next.js Config - Environment Variables:");
console.log(
  "NEXT_PUBLIC_SHOPIFY_AUTH_AUTHORIZE_URL:",
  process.env.NEXT_PUBLIC_SHOPIFY_AUTH_AUTHORIZE_URL
);
console.log("All env variables:", nextConfig.env);

export default nextConfig;

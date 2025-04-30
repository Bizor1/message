// scripts/test-shopify.mjs
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

// Dynamically import the shopifyFetch function
// Use a dynamic import() because shopifyFetch might rely on browser APIs
// or other modules not immediately available in a simple Node script context,
// although in this specific case, it uses node-fetch implicitly via Next.js's fetch.
// A dynamic import is generally safer for components potentially using client features.
let shopifyFetch;
try {
  const shopifyLib = await import("../src/lib/shopify.js"); // Adjust path if needed, try .js extension
  shopifyFetch = shopifyLib.shopifyFetch;
} catch (e) {
  try {
    const shopifyLib = await import("../src/lib/shopify.ts"); // Fallback to .ts
    shopifyFetch = shopifyLib.shopifyFetch;
  } catch (err) {
    console.error(
      "Failed to import shopifyFetch. Ensure the path and file extension are correct.",
      err
    );
    process.exit(1);
  }
}

// Basic GraphQL query to get the shop name
const GET_SHOP_NAME_QUERY = `
  query GetShopName {
    shop {
      name
    }
  }
`;

// Function to run the test
async function testShopifyConnection() {
  if (!shopifyFetch) {
    console.error("shopifyFetch function could not be loaded.");
    return;
  }
  console.log("Attempting to connect to Shopify...");
  console.log(`Using Domain: ${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`);
  console.log(
    `Using Token: ${
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
        ? process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN.substring(0, 5) + "..."
        : "Not Found"
    }`
  );

  try {
    // Define the expected type for the shop name query response
    // Removed TypeScript type alias from .mjs file
    // type ShopNameResponse = {
    //   shop: {
    //     name: string,
    //   },
    // };

    // The type <any> is used here because we removed the specific type
    // from this JS file. The actual fetch function is still typed.
    const data = (await shopifyFetch) < any > GET_SHOP_NAME_QUERY;
    console.log("\n✅ Success! Shopify API Connection Test Passed.");
    // Check if shop and name exist before accessing
    if (data && data.shop && data.shop.name) {
      console.log("   Shop Name:", data.shop.name);
    } else {
      console.log(
        "   Shop Name: (Could not retrieve name, but connection likely okay)"
      );
      console.log("   Received Data:", JSON.stringify(data)); // Log received data for debugging
    }
  } catch (error) {
    console.error("\n❌ Error! Shopify API Connection Test Failed.");
    if (error instanceof Error) {
      console.error("   Reason:", error.message);
      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        console.error(
          "   Suggestion: Double-check your SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local."
        );
      } else if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("domain")
      ) {
        console.error(
          "   Suggestion: Double-check your NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN in .env.local and ensure the domain is correct."
        );
      }
    } else {
      console.error("   An unknown error occurred:", error);
    }
  }
}

// Run the test
testShopifyConnection();

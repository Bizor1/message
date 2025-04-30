// src/lib/shopify.ts

// Type for the expected GraphQL response structure
type ShopifyResponse<T> = {
    data?: T;
    errors?: { message: string }[];
};

/**
 * Sends a GraphQL query or mutation to the Shopify Storefront API.
 * @param query The GraphQL query or mutation string.
 * @param variables Optional variables for the GraphQL query.
 * @returns The data part of the Shopify response.
 * @throws Error if the fetch fails or Shopify returns errors.
 */
export async function shopifyFetch<T>(
    query: string,
    variables: Record<string, unknown> = {}
): Promise<T> {
    // const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? 
    //     `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json` : // Use your specific API version if needed
    //     '';
    // const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

    // Directly using the provided values:
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN; // Corrected typo from myshopfy
    const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    // const endpoint = `https://${storeDomain}/api/2024-04/graphql.json`;
    const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`; // Trying API version 2024-01
    const key = storefrontAccessToken;

    // Removed the check for environment variables as they are now hardcoded
    // if (!endpoint || !key) {
    //     throw new Error('Shopify domain or access token is not configured in environment variables.');
    // }

    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key,
            },
            body: JSON.stringify({ query, variables }),
            // Revalidate data frequently (e.g., every 15 mins) or use tags for on-demand revalidation
            // Adjust cache strategy as needed for your application
            cache: 'no-store', // Or consider 'force-cache' or { next: { revalidate: 900 } } 
        });

        const body = await result.json() as ShopifyResponse<T>;

        if (!result.ok) {
            throw new Error(`Fetch failed: ${result.status} ${result.statusText}`);
        }

        if (body.errors) {
            console.error('Shopify GraphQL Errors:', body.errors);
            throw new Error(body.errors.map((e) => e.message).join('\n'));
        }

        if (!body.data) {
            throw new Error('No data returned from Shopify API.');
        }

        return body.data;
    } catch (error) {
        console.error('Error fetching from Shopify:', error);
        // Rethrow or handle error as appropriate for your application
        if (error instanceof Error) {
            throw new Error(`Shopify API fetch error: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while fetching from Shopify.');
        }
    }
} 
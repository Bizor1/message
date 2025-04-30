import { notFound } from 'next/navigation';
// ProductCard is no longer needed here, it's used in CollectionClientLayout
// import Header from '@/components/Header'; // Likely in layout.tsx
import CollectionClientLayout from '@/components/CollectionClientLayout'; // Import the new client component

// Keep the dummy data definition here or move to a shared location
const dummyProducts = [
    {
        id: '1',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: '247 Fused Shorts',
        price: 120,
        color: 'Cinder',
        variantCount: 3,
        href: '/products/247-fused-shorts'
    },
    {
        id: '2',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Team 247 2-In-1 Shorts',
        price: 115,
        color: 'Black',
        href: '/products/team-247-2-in-1-shorts'
    },
    {
        id: '3',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: '247 Compound Legging Short',
        price: 90,
        color: 'Black',
        href: '/products/247-compound-legging-short'
    },
    {
        id: '4',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: '247 DNA Mesh Shorts',
        price: 95,
        color: 'Black',
        href: '/products/247-dna-mesh-shorts'
    },
    // Adding more products
    {
        id: '5',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Another Shorts Style',
        price: 110,
        color: 'Grey',
        href: '/products/another-shorts-style'
    },
    {
        id: '6',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Pro Performance Shorts',
        price: 130,
        color: 'Navy',
        variantCount: 2,
        href: '/products/pro-performance-shorts'
    },
    {
        id: '7',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Essential Lounge Shorts',
        price: 85,
        color: 'Olive',
        href: '/products/essential-lounge-shorts'
    },
    {
        id: '8',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Urban Explorer Shorts',
        price: 105,
        color: 'Stone',
        variantCount: 4,
        href: '/products/urban-explorer-shorts'
    },
    {
        id: '9',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Active Flex Shorts',
        price: 99,
        color: 'Charcoal',
        href: '/products/active-flex-shorts'
    },
    {
        id: '10',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Stealth Black Shorts',
        price: 118,
        color: 'Black',
        href: '/products/stealth-black-shorts'
    },
    {
        id: '11',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Comfort Fit Shorts',
        price: 89,
        color: 'Beige',
        variantCount: 2,
        href: '/products/comfort-fit-shorts'
    },
    {
        id: '12',
        imageUrlFront: '/images/PHOTO-2025-04-29-10-42-31.jpg',
        imageUrlBack: '/images/PHOTO-2025-04-29-10-42-32 (2).jpg',
        name: 'Ultra Light Run Shorts',
        price: 125,
        color: 'White',
        href: '/products/ultra-light-run-shorts'
    },
];

export default async function CollectionPage({ params }: { params: { handle: string } }) {
    const { handle } = params;

    // TODO: Replace dummy data fetch with actual API call to Shopify
    const collectionName = handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const products = dummyProducts;

    if (!products || products.length === 0) {
        // Consider showing a message or redirecting if no products after API call
        // notFound(); 
    }

    // Render the Client Component, passing data as props
    return (
        <CollectionClientLayout
            collectionName={collectionName}
            products={products || []} // Pass empty array if products is null/undefined
            productCount={products?.length} // Pass the product count
        />
    );
} 
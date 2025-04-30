import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // Import useCart

// Define a simple type for dummy data
interface DummyProduct {
    id: string;
    imageUrlFront: string; // Front image URL
    imageUrlBack: string;  // Back image URL
    name: string;
    price: number;
    currencyCode?: string;
    color?: string;
    variantCount?: number;
    href: string; // Link URL for the product details page
}

interface ProductCardProps {
    product: DummyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, openCart } = useCart(); // Get functions from context

    const handleAddToCart = () => {
        // In a real scenario, you'd need variant selection.
        // For now, add the base product info.
        addToCart({
            id: product.id, // Should be variant ID eventually
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrlFront, // Use front image for cart display
            href: product.href,
            // variantTitle: selectedVariant.title // e.g. "XL Black"
        });
        openCart(); // Open the sidebar
    };

    const displayPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: product.currencyCode || 'USD',
        minimumFractionDigits: 0, // Display whole numbers for price
        maximumFractionDigits: 0,
    }).format(product.price);

    return (
        <div className="relative group">
            {/* Product Image Container */}
            <Link href={product.href} className="relative block bg-represent-gray aspect-square overflow-hidden">
                {/* Front Image */}
                <Image
                    src={product.imageUrlFront}
                    alt={product.name} // Alt text primarily for the front image
                    width={500}
                    height={500}
                    className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                />
                {/* Back Image */}
                <Image
                    src={product.imageUrlBack}
                    alt="" // Alt text can be empty for decorative back image
                    aria-hidden="true" // Hide from screen readers
                    width={500}
                    height={500}
                    className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
            </Link>

            {/* Product Info - Adjusted Layout */}
            <div className="mt-2 flex justify-between items-start text-xs">
                {/* Left side: Name and Color/Variants */}
                <div>
                    <h3 className="font-medium text-represent-text">
                        <Link href={product.href}>
                            {product.name}
                        </Link>
                    </h3>
                    <p className="text-represent-muted mt-1">
                        {product.color}
                        {product.variantCount && product.color ? ` · ` : ''}
                        {product.variantCount ? `${product.variantCount} Colours` : ''}
                    </p>
                </div>
                {/* Right side: Price */}
                <p className="font-medium text-represent-text text-right">
                    {displayPrice}
                </p>
            </div>

            {/* Quick Add/Wishlist Icon (Top Right) - Updated onClick */}
            <button
                onClick={handleAddToCart}
                className="absolute top-2 right-2 p-1 text-represent-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/50 hover:bg-white rounded-full"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="sr-only">Add to bag</span>
            </button>
        </div>
    );
} 
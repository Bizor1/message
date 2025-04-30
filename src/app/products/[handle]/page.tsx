import Image from 'next/image';
import Link from 'next/link';

type ProductParams = {
    params: {
        handle: string;
    };
};

// This would eventually be replaced with actual Shopify data fetching
// For now we'll use placeholder data
const getProductData = (handle: string) => {
    return {
        id: `product-${handle}`,
        title: handle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: "Premium quality product made with the finest materials. This item features a modern design that's perfect for any occasion.",
        price: "149.99",
        currencyCode: "USD",
        images: [
            // Placeholder images - would be replaced with actual product images
            "/images/placeholder.jpg",
            "/images/placeholder.jpg",
            "/images/placeholder.jpg",
        ],
        variants: [
            { id: 'variant-1', title: 'Small', available: true },
            { id: 'variant-2', title: 'Medium', available: true },
            { id: 'variant-3', title: 'Large', available: false },
            { id: 'variant-4', title: 'X-Large', available: true },
        ]
    };
};

export default function ProductPage({ params }: ProductParams) {
    const { handle } = params;
    const product = getProductData(handle);

    return (
        <div className="py-12">
            <div className="container-represent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Images */}
                    <div>
                        <div className="grid grid-cols-1 gap-4">
                            {product.images.map((image, index) => (
                                <div key={index} className="relative aspect-square bg-gray-100">
                                    {/* Replace with actual Image component when you have real images */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        Product Image {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="sticky top-24 self-start">
                        <h1 className="text-xl md:text-2xl font-bold mb-2">{product.title}</h1>

                        <div className="mb-6">
                            <p className="text-sm">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: product.currencyCode,
                                    minimumFractionDigits: 2,
                                }).format(parseFloat(product.price))}
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs text-gray-600 mb-4">{product.description}</p>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <p className="text-xs mb-2">Size</p>
                            <div className="grid grid-cols-4 gap-2">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        className={`border text-xs py-2 px-4 ${variant.available
                                            ? 'border-black hover:bg-black hover:text-white'
                                            : 'border-gray-200 text-gray-300 cursor-not-allowed'
                                            }`}
                                        disabled={!variant.available}
                                    >
                                        {variant.title}
                                    </button>
                                ))}
                            </div>
                            {product.variants.some(v => !v.available) && (
                                <p className="text-xs text-gray-500 mt-2">Some sizes are currently unavailable</p>
                            )}
                        </div>

                        {/* Add to Cart Button */}
                        <button className="w-full bg-black text-white py-3 uppercase text-xs tracking-wider hover:bg-gray-900 transition-colors mb-4">
                            Add to Cart
                        </button>

                        {/* Size Guide */}
                        <button className="text-xs underline mb-6 inline-block">Size Guide</button>

                        {/* Product Details Accordion */}
                        <div className="border-t border-gray-200 pt-4 mb-4">
                            <button className="flex justify-between items-center w-full py-2 text-left">
                                <span className="text-xs uppercase font-medium">Details</span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                            <div className="hidden">
                                <p className="text-xs py-4">
                                    Additional product details would go here.
                                </p>
                            </div>
                        </div>

                        {/* Shipping Accordion */}
                        <div className="border-t border-gray-200 pt-4 mb-4">
                            <button className="flex justify-between items-center w-full py-2 text-left">
                                <span className="text-xs uppercase font-medium">Shipping & Returns</span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                            <div className="hidden">
                                <p className="text-xs py-4">
                                    Shipping and returns policy would go here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <h2 className="text-lg font-bold mb-8 text-center uppercase">You Might Also Like</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Array(4).fill(null).map((_, index) => (
                            <div key={index} className="group">
                                <Link href={`/products/related-product-${index + 1}`}>
                                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Related Product {index + 1}
                                        </div>
                                    </div>
                                    <div className="px-1">
                                        <h3 className="text-xs font-normal line-clamp-1 mb-1">Related Product {index + 1}</h3>
                                        <p className="text-xs font-normal">$149.99</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 
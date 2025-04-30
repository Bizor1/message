'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

// Placeholder for expandable section logic
const ExpandableSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    // TODO: Implement state/logic to toggle visibility of children
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <div>
            <button
                className="w-full flex justify-between items-center py-2 text-left text-sm font-medium"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {title}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    {/* Use plus/minus or chevron based on desired design */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            {isExpanded && (
                <div className="pl-4 pb-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { itemCount } = useCart(); // Get item count if needed

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white z-[60] md:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}">
            <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <button onClick={onClose} className="text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        {/* Search Icon */}
                        <button className="text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        {/* Optional: Notification Icon */}
                        {/* <button className="text-black"><svg>...</svg></button> */}
                        {/* Optional: Bookmark Icon */}
                        {/* <button className="text-black"><svg>...</svg></button> */}
                    </div>
                    {/* Main Nav Links */}
                    <nav className="flex space-x-4">
                        <Link href="/men" className="text-sm font-medium" onClick={onClose}>Man</Link>
                        <Link href="/women" className="text-sm font-medium" onClick={onClose}>Woman</Link>
                        <Link href="/247" className="text-sm font-medium" onClick={onClose}>247</Link>
                    </nav>
                </div>

                {/* Menu Content - Scrollable */}
                <div className="flex-grow overflow-y-auto p-4 space-y-6 text-sm">
                    {/* Top Level Links */}
                    <div className="space-y-2">
                        <Link href="#" className="block font-medium" onClick={onClose}>247 Woman</Link>
                        <Link href="#" className="block font-medium" onClick={onClose}>New Arrivals</Link>
                        <Link href="#" className="block font-medium" onClick={onClose}>247 Spring Summer</Link>
                        <Link href="#" className="block font-medium" onClick={onClose}>247 Archetype</Link>
                    </div>

                    {/* SHOP Section */}
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Shop</h3>
                        <ExpandableSection title="Clothing">
                            {/* Add Sublinks here */}
                            <Link href="/collections/clothing/tops" className="block py-1 text-xs" onClick={onClose}>Tops</Link>
                            <Link href="/collections/clothing/bottoms" className="block py-1 text-xs" onClick={onClose}>Bottoms</Link>
                        </ExpandableSection>
                        <ExpandableSection title="Collections">
                            <Link href="/collections/all" className="block py-1 text-xs" onClick={onClose}>All Collections</Link>
                        </ExpandableSection>
                        <ExpandableSection title="Footwear">
                            <Link href="/collections/footwear/sneakers" className="block py-1 text-xs" onClick={onClose}>Sneakers</Link>
                        </ExpandableSection>
                        <Link href="#" className="block py-2 text-sm font-medium" onClick={onClose}>Outfits <span className="text-xs text-gray-400 ml-1">Shop curated looks</span></Link>
                    </div>

                    {/* WOMAN Section (Example) */}
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Woman</h3>
                        <Link href="#" className="block py-1 text-sm font-medium" onClick={onClose}>Discover 247 Woman</Link>
                    </div>

                    {/* EXPLORE Section */}
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Explore</h3>
                        <Link href="#" className="block py-1 text-sm font-medium" onClick={onClose}>247 App</Link>
                        <Link href="#" className="block py-1 text-sm font-medium" onClick={onClose}>247 Strava</Link>
                        <Link href="#" className="block py-1 text-sm font-medium" onClick={onClose}>247 Blog</Link>
                    </div>

                    {/* Other Sections Placeholder */}
                    <div className="border-t border-gray-100 pt-4 text-gray-500">
                        <h3 className="text-xs font-semibold uppercase tracking-wider mb-2">Client Services</h3>
                        <Link href="#" className="block py-1 text-sm" onClick={onClose}>Help</Link>
                        {/* ... other links */}
                        <h3 className="text-xs font-semibold uppercase tracking-wider mt-4 mb-2">Company</h3>
                        <Link href="#" className="block py-1 text-sm" onClick={onClose}>About</Link>
                        {/* ... other links */}
                        <h3 className="text-xs font-semibold uppercase tracking-wider mt-4 mb-2">Brand</h3>
                        <Link href="#" className="block py-1 text-sm" onClick={onClose}>Our Story</Link>
                        {/* ... other links */}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 mt-auto bg-white">
                    {/* Language/Region Selector Placeholder */}
                    <button className="text-sm flex items-center">
                        <span className="mr-1">🇬🇭</span> GH / $ / English
                        {/* Add arrow icon */}
                    </button>
                </div>
            </div>
        </div>
    );
} 
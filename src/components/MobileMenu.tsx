'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCollections } from '@/context/CollectionsContext';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { } = useCart();
    const { collections } = useCollections();

    if (!isOpen) return null;

    // Get the first collection since we know there's only one
    const mainCollection = collections?.[0];

    return (
        <div className="fixed inset-0 bg-white z-[60] md:hidden">
            <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <button onClick={onClose} className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <Link href="/" className="text-xl font-bold">
                        MyMessage
                    </Link>
                    <div className="w-6" /> {/* Empty div for flex spacing */}
                </div>

                {/* Menu Content - Scrollable */}
                <div className="flex-grow overflow-y-auto p-4 space-y-6">
                    {/* Search */}
                    <button className="w-full text-left py-2 text-base font-medium" onClick={onClose}>
                        Search
                    </button>

                    {/* Main Navigation Links */}
                    <div className="border-t border-gray-100 pt-4">
                        <div className="space-y-3">
                            <Link href="/men" className="block text-base" onClick={onClose}>
                                Under His Shelter
                            </Link>
                            <Link href="/women" className="block text-base" onClick={onClose}>
                                Grey washed
                            </Link>
                        </div>
                    </div>

                    {/* Shop Section */}
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="text-sm font-semibold uppercase mb-4">SHOP</h3>
                        <div className="space-y-3">
                            {mainCollection && (
                                <Link
                                    href={`/collections/${mainCollection.handle}`}
                                    className="block text-base"
                                    onClick={onClose}
                                >
                                    {mainCollection.title}
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Explore Section */}
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="text-sm font-semibold uppercase mb-4">EXPLORE</h3>
                        <div className="space-y-3">
                            <Link href="/about" className="block text-base" onClick={onClose}>
                                About Us
                            </Link>
                            <Link href="/story" className="block text-base" onClick={onClose}>
                                Story
                            </Link>
                            <Link href="/contact" className="block text-base" onClick={onClose}>
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
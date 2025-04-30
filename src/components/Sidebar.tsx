'use client';

import Link from 'next/link';

interface SidebarProps {
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export default function Sidebar({ isOpen, onMouseEnter, onMouseLeave }: SidebarProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-40 p-8 transition-transform duration-300 ease-in-out transform translate-x-0"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <nav className="flex flex-col space-y-8">
                {/* SHOP Section */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Shop</h3>
                    <ul className="space-y-3">
                        <li><Link href="/new-arrivals" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">New Arrivals</Link></li>
                        <li><Link href="/ss25-overdrive" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">SS25 Overdrive</Link></li>
                        <li><Link href="/owners-club" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">Owners Club</Link></li>
                        <li><Link href="/initial" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">Initial</Link></li>
                        <li><Link href="/247" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">247</Link></li>
                        <li className="pt-4">
                            <Link href="/collections/clothing" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">
                                Clothing
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections/collections" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">
                                Collections
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections/collaborations" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">
                                Collaborations
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections/footwear" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">
                                Footwear
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections/accessories" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">
                                Accessories
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Link>
                        </li>
                        <li><Link href="/bestsellers" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">Bestsellers</Link></li>
                        <li><Link href="/gift-card" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">Gift Card</Link></li>
                        <li><Link href="/outfits" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">Outfits <span className="text-xs text-gray-400 ml-1">Shop curated looks</span></Link></li>
                    </ul>
                </div>

                {/* EXPLORE Section */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Explore</h3>
                    <ul className="space-y-3">
                        <li><Link href="/prestige" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">Prestige</Link></li>
                        <li><Link href="/behind-the-brand" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">Behind the brand</Link></li>
                        <li><Link href="/lookbooks" className="text-black hover:text-gray-700 text-sm font-medium flex justify-between items-center">Lookbooks</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
} 
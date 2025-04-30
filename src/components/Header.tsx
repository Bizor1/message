'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname } from 'next/navigation';
import Sidebar from "./Sidebar";
import { useCart } from "@/context/CartContext";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const sidebarTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();
    const { openCart, itemCount } = useCart();

    const isCollectionPage = pathname.startsWith('/collections/');

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (sidebarTimeoutRef.current) {
                clearTimeout(sidebarTimeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (category: string) => {
        if (sidebarTimeoutRef.current) {
            clearTimeout(sidebarTimeoutRef.current);
            sidebarTimeoutRef.current = null;
        }
        setIsSidebarOpen(true);
        setHoveredCategory(category);
    };

    const handleMouseLeave = () => {
        sidebarTimeoutRef.current = setTimeout(() => {
            setIsSidebarOpen(false);
            setHoveredCategory(null);
        }, 200);
    };

    const useSolidStyle = isCollectionPage || isSidebarOpen;
    const linkClassName = useSolidStyle ? "nav-link" : "nav-link-transparent";
    const headerBgClass = useSolidStyle ? "bg-white" : "bg-transparent";
    const logoTextColor = useSolidStyle ? "text-black" : "text-white";

    const imageSrc = hoveredCategory === 'men'
        ? '/images/Regular Fit Soft Twill Smart Shirt & Pants Set _ boohooMAN USA.jpg'
        : '/images/Corporate Girlie✨.jpg';
    const blurOverlayLeft = "left-[40rem]";

    return (
        <>
            {/* Blur overlay - Hidden on mobile (md:block) */}
            {isSidebarOpen && hoveredCategory && (
                <div className={`fixed top-16 ${blurOverlayLeft} right-0 h-[calc(100vh-4rem)] bg-black/30 backdrop-blur-sm z-30 hidden md:block`} aria-hidden="true"></div>
            )}

            {/* Image Display - Hidden on mobile (md:block) */}
            <div
                className={`fixed top-16 left-64 w-96 h-[calc(100vh-4rem)] z-30 overflow-hidden transition-opacity duration-1000 ease-in-out ${isSidebarOpen && hoveredCategory ? 'opacity-100' : 'opacity-0'} hidden md:block`}
            >
                {/* Conditionally render image only when needed to potentially save resources */}
                {isSidebarOpen && hoveredCategory && (
                    <Image
                        src={imageSrc}
                        alt={`${hoveredCategory} category image`}
                        layout="fill"
                        objectFit="cover"
                        quality={80}
                    />
                )}
            </div>

            <div className={`sticky top-0 left-0 right-0 z-50 ${headerBgClass} transition-colors duration-300 ease-in-out`}>
                <header className={`absolute w-full ${headerBgClass} transition-colors duration-300 ease-in-out`}>
                    <div className="container-represent">
                        <div className="flex justify-between items-center h-16">
                            {/* Left navigation - Hidden below md */}
                            <nav className="hidden md:flex space-x-6">
                                {/* Pass category to handlers - hover only active on md+ screens */}
                                <div onMouseEnter={() => handleMouseEnter('men')} onMouseLeave={handleMouseLeave} className="hidden md:block">
                                    <Link href="/men" className={linkClassName}>
                                        Man
                                    </Link>
                                </div>
                                <div onMouseEnter={() => handleMouseEnter('women')} onMouseLeave={handleMouseLeave} className="hidden md:block">
                                    <Link href="/women" className={linkClassName}>
                                        Woman
                                    </Link>
                                </div>
                                {/* 247 link remains visible */}
                                <Link href="/247" className={linkClassName}>
                                    247
                                </Link>
                            </nav>

                            {/* Mobile nav toggle - Opens Mobile Menu */}
                            <button
                                className={`md:hidden ${logoTextColor}`}
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>

                            {/* Logo - Stays centered */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden">
                                <Link href="/" className={`text-lg font-bold uppercase tracking-widest ${logoTextColor} flex items-center justify-center`}>
                                    <div className="relative">
                                        {/* MY part */}
                                        <span
                                            className={`inline-block transition-all duration-500 ease-in-out transform ${scrolled
                                                ? "opacity-0 -translate-x-full absolute"
                                                : "opacity-100 translate-x-0 relative"
                                                }`}
                                        >
                                            MY&nbsp;
                                        </span>

                                        {/* M (stays visible) */}
                                        <span
                                            className={`inline-block transition-all duration-500 ease-in-out transform ${scrolled ? "scale-110" : "scale-100"
                                                }`}
                                        >
                                            M
                                        </span>

                                        {/* ESSAGE part */}
                                        <span
                                            className={`inline-block transition-all duration-500 ease-in-out transform ${scrolled
                                                ? "opacity-0 translate-x-full absolute"
                                                : "opacity-100 translate-x-0 relative"
                                                }`}
                                        >
                                            ESSAGE
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Right section: Cart icon on mobile, more icons on desktop */}
                            <div className="flex items-center space-x-4">
                                {/* Desktop Right navigation - Hidden below md */}
                                <nav className="hidden md:flex items-center space-x-4">
                                    <Link href="/retail" className={linkClassName}>
                                        Retail
                                    </Link>
                                    <Link href="/vault" className={linkClassName}>
                                        The Vault
                                    </Link>
                                    <Link href="/prestige" className={linkClassName}>
                                        Prestige
                                    </Link>
                                    {/* Search Icon - Desktop only */}
                                    <Link href="/search" className={linkClassName}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </Link>
                                </nav>

                                {/* Cart Button - Visible on all sizes */}
                                <button onClick={openCart} className={`${linkClassName} relative`}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <span className="sr-only">Open cart</span>
                                    {itemCount > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {itemCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            {/* Render Sidebar - Hidden on mobile (md:block) */}
            <div className="hidden md:block">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onMouseEnter={() => hoveredCategory && handleMouseEnter(hoveredCategory)}
                    onMouseLeave={handleMouseLeave}
                />
            </div>

            {/* Render Mobile Menu - Conditionally rendered */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
} 
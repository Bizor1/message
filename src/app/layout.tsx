import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { CollectionsProvider } from '@/context/CollectionsContext'
import CartSidebar from "@/components/CartSidebar";
import ChatModal from "@/components/ChatModal";
import { Providers } from './providers';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MYMESSAGE | Fashion Brand",
  description: "Premium fashion brand for the modern individual.",
  icons: {
    icon: '/favicons/favicon.jpeg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/png" href="/favicons/favicon.png" sizes="32x32" />
        {/* The problematic style block is removed */}
      </head>
      <body>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <SidebarProvider>
                <CollectionsProvider>
                  <Header />
                  <main>{children}</main>
                  <CartSidebar />
                  <ChatModal />
                  <footer className="bg-white pt-16 pb-8">
                    <div className="container-represent">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                          <h3 className="text-sm font-medium mb-4">Client Services</h3>
                          <ul className="space-y-2">
                            <li><Link href="/help" className="text-xs text-gray-600 hover:text-black">Live Chat</Link></li>
                            <li><Link href="/support" className="text-xs text-gray-600 hover:text-black">Support Hub</Link></li>
                            <li><Link href="/orders/track" className="text-xs text-gray-600 hover:text-black">Track Order</Link></li>
                            <li><Link href="/returns" className="text-xs text-gray-600 hover:text-black">Make a Return</Link></li>
                            <li><Link href="/stores" className="text-xs text-gray-600 hover:text-black">Stores</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-4">Company</h3>
                          <ul className="space-y-2">
                            <li><Link href="/about" className="text-xs text-gray-600 hover:text-black">About</Link></li>
                            <li><Link href="/careers" className="text-xs text-gray-600 hover:text-black">Careers</Link></li>
                            <li><Link href="/reviews" className="text-xs text-gray-600 hover:text-black">Reviews</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-4">Social</h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="https://www.instagram.com/mymessage55"
                                className="flex items-center text-xs text-gray-600 hover:text-black"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaInstagram className="w-4 h-4 mr-2" />
                                Instagram
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.tiktok.com/@mymessage55"
                                className="flex items-center text-xs text-gray-600 hover:text-black"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaTiktok className="w-4 h-4 mr-2" />
                                TikTok
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://wa.me/447307638132"
                                className="flex items-center text-xs text-gray-600 hover:text-black"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaWhatsapp className="w-4 h-4 mr-2" />
                                WhatsApp
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-4">Newsletter</h3>
                          <p className="text-xs text-gray-600 mb-4">Sign up to receive updates on new arrivals and special offers</p>
                          <form className="flex">
                            <input
                              type="email"
                              placeholder="Email address"
                              className="px-3 py-2 border border-gray-300 text-xs flex-1"
                            />
                            <button className="bg-black text-white px-4 py-2 text-xs uppercase">
                              Sign Up
                            </button>
                          </form>
                        </div>
                      </div>

                      <div className="mt-12 pt-8 border-t border-gray-100 text-xs text-gray-500">
                        <p>© {new Date().getFullYear()} Fashion Brand. All rights reserved.</p>
                      </div>
                    </div>
                  </footer>
                </CollectionsProvider>
              </SidebarProvider>
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

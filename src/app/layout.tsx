import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fashion Brand | Premium Clothing",
  description: "Premium fashion clothing brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* The problematic style block is removed */}
      </head>
      <body className={`${inter.variable} font-inter`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartSidebar />
            <main>{children}</main>

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
                      <li><a href="https://instagram.com" className="text-xs text-gray-600 hover:text-black">Instagram</a></li>
                      <li><a href="https://facebook.com" className="text-xs text-gray-600 hover:text-black">Facebook</a></li>
                      <li><a href="https://tiktok.com" className="text-xs text-gray-600 hover:text-black">TikTok</a></li>
                      <li><a href="https://youtube.com" className="text-xs text-gray-600 hover:text-black">YouTube</a></li>
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
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

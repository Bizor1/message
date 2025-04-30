'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';

// Define the shape of a cart item
export interface CartItem {
    id: string; // Use variant ID in real implementation
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    variantTitle?: string; // e.g., "XL Black"
    href?: string;
}

// Define the shape of the context
interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    openCart: () => void;
    closeCart: () => void;
    cartTotal: number;
    itemCount: number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem('shoppingCart');
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
                localStorage.removeItem('shoppingCart'); // Clear invalid data
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    const addToCart = useCallback((itemToAdd: Omit<CartItem, 'quantity'>) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                // Increment quantity
                return prevItems.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add new item
                return [...prevItems, { ...itemToAdd, quantity: 1 }];
            }
        });
    }, []);

    const removeFromCart = useCallback((itemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }, []);

    const updateQuantity = useCallback((itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, quantity } : item
                )
            );
        }
    }, [removeFromCart]);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            openCart,
            closeCart,
            cartTotal,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 
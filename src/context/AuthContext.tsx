'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerAccessToken } from '../types/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: string | null;
    login: (token: CustomerAccessToken) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        // Check for stored token on mount
        const storedToken = localStorage.getItem('customerAccessToken');
        if (storedToken) {
            try {
                const tokenData = JSON.parse(storedToken);
                // Check if token is expired
                if (new Date(tokenData.expiresAt) > new Date()) {
                    setAccessToken(tokenData.accessToken);
                } else {
                    localStorage.removeItem('customerAccessToken');
                }
            } catch (error) {
                localStorage.removeItem('customerAccessToken');
            }
        }
    }, []);

    const login = (token: CustomerAccessToken) => {
        localStorage.setItem('customerAccessToken', JSON.stringify(token));
        setAccessToken(token.accessToken);
    };

    const logout = () => {
        localStorage.removeItem('customerAccessToken');
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!accessToken,
                accessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 
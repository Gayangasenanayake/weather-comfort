// components/AuthProvider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  mfaRequired: boolean;
  mfaEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  verifyMFA: (code: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  resendMFACode: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaEmail, setMfaEmail] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.data || data);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('token_type');
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem('token');
      localStorage.removeItem('token_type');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      
      // Check if MFA is required from the response
      if (data.data?.requires_mfa === true) {
        setMfaRequired(true);
        setMfaEmail(data.data?.email || email);
        return;
      }

      // Direct login without MFA
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('token_type', data.data.token_type || 'Bearer');
        setUser(data.data.user);
        setMfaRequired(false);
        setMfaEmail(null);
      }
    } catch (error) {
      throw error;
    }
  };

  const verifyMFA = async (code: string) => {
    if (!mfaEmail) {
      throw new Error("No email found for MFA verification");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/verify-mfa", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ 
          email: mfaEmail, 
          code 
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "MFA verification failed");
      }

      const data = await response.json();
      
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('token_type', data.data.token_type || 'Bearer');
        setUser(data.data.user);
        setMfaRequired(false);
        setMfaEmail(null);
      }
    } catch (error) {
      throw error;
    }
  };

  const resendMFACode = async () => {
    if (!mfaEmail) {
      throw new Error("No email found for MFA code resend");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/resend-mfa", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email: mfaEmail }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to resend MFA code");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
        password_confirmation 
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const data = await response.json();
    
    if (data.data?.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('token_type', data.data.token_type || 'Bearer');
      setUser(data.data.user);
      setMfaRequired(false);
      setMfaEmail(null);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    setUser(null);
    setMfaRequired(false);
    setMfaEmail(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      mfaRequired, 
      mfaEmail,
      login, 
      verifyMFA,
      register, 
      logout,
      resendMFACode
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
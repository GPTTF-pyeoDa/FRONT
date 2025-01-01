"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  memID: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/verify`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("verify test: ", response);

        if (!response.ok) {
          // 토큰이 유효하지 않은 경우
          localStorage.removeItem("token");
          setUser(null);
          return;
        }

        // 토큰이 유효한 경우
        const decodedToken: User = jwtDecode(token);
        setUser({
          memID: decodedToken.memID,
          name: decodedToken.name,
        });
      } catch (error) {
        console.error("사용자 인증 확인 실패:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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

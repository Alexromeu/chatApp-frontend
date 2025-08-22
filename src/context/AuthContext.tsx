// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "../types/types"
import type { AuthContextType } from "../types/types"



const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("authToken");

    if (stored) {
      setToken(stored);

      try {
        const decoded = jwtDecode<TokenPayload>(stored);
        setUserId(decoded.userId);
        setUsername(decoded.username)

      } catch {
        logout(); 
      }
    }
  }, []);

  const login = (newToken: string) => { 
    sessionStorage.setItem("authToken", newToken);
    setToken(newToken);
    const decoded = jwtDecode<TokenPayload>(newToken);
    setUserId(decoded.userId);
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        username,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
   return context;
};

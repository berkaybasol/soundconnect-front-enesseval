"use client";

import { ApiAuthResponse } from "@/lib/saveTokenForDevMode";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const LOCAL_STORAGE_AUTH_TOKEN_KEY = "authToken_dev";
const LOCAL_STORAGE_USER_ROLES_KEY = "userRoles_dev";

interface AuthState {
   token: string | null;
   roles: string[];
   isAuthenticated: boolean;
   isLoading: boolean; // Uygulama ilk yüklenirken auth durumunu kontrol etmek için
   user?: any; // Token'dan veya ayrı bir /me endpoint'inden gelen diğer kullanıcı bilgileri için
}

interface AuthContextType extends AuthState {
   login: (authData: ApiAuthResponse) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [authState, setAuthState] = useState<AuthState>({
      token: null,
      roles: [],
      isAuthenticated: false,
      isLoading: true,
   });

   const router = useRouter();

   useEffect(() => {
      try {
         const storedToken = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
         const storedRolesString = localStorage.getItem(LOCAL_STORAGE_USER_ROLES_KEY);
         const storedRoles = storedRolesString ? JSON.parse(storedRolesString) : [];

         if (storedToken) {
            setAuthState({
               token: storedToken,
               roles: storedRoles,
               isAuthenticated: true,
               isLoading: false,
            });
         } else {
            console.log("[AuthContext] No token found in localStorage.");
            setAuthState((prev) => ({ ...prev, isLoading: false }));
         }
      } catch (error) {
         console.error("[AuthContext] Error reading from localStorage:", error);
         setAuthState((prev) => ({ ...prev, isLoading: false }));
         // localStorage bozuksa temizleyelim
         localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
         localStorage.removeItem(LOCAL_STORAGE_USER_ROLES_KEY);
         setAuthState({
            token: null,
            roles: [],
            isAuthenticated: false,
            isLoading: false,
         });
      }
   }, []);

   const login = (authData: ApiAuthResponse) => {
      if (authData.success && authData.data && authData.data.token) {
         const token = authData.data.token;
         const roles = authData.data.roles || [];

         try {
            // ***** YENİ EKLENEN KISIM: localStorage'a KAYDETME *****
            localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token);
            localStorage.setItem(LOCAL_STORAGE_USER_ROLES_KEY, JSON.stringify(roles));
            console.log("[AuthContext] Token and roles saved to localStorage.");
            // ***** YENİ EKLENEN KISIM SONU *****

            setAuthState({
               token,
               roles,
               isAuthenticated: true,
               isLoading: false,
            });
            console.log("[AuthContext] User logged in. Token:", token, "Roles:", roles);

            // Giriş sonrası yönlendirme
            if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_OWNER")) {
               router.push("/admin-dashboard");
            } else if (roles.includes("ROLE_USER")) {
               router.push("/user");
            } else {
               router.push("/");
            }
         } catch (error) {
            console.error("[AuthContext] Error saving to localStorage during login:", error);
            // localStorage'a yazma hatası olursa kullanıcıya bilgi verilebilir
            // ve state'i login olmamış gibi bırakabiliriz.
            setAuthState((prev) => ({ ...prev, isAuthenticated: false, token: null, roles: [] }));
         }
      } else {
         console.error("[AuthContext] Login failed or token not provided in authData:", authData);
         // Hata durumunda state'i login olmamış gibi bırak
         setAuthState((prev) => ({ ...prev, isAuthenticated: false, token: null, roles: [] }));
      }
   };

   const logout = () => {
      console.log("[AuthContext] Logging out user...");
      localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_ROLES_KEY);
      setAuthState({
         token: null,
         roles: [],
         isAuthenticated: false,
         isLoading: false,
      });
      // Opsiyonel: Backend'de token'ı geçersiz kılmak için API çağrısı yapılabilir.
      // await axiosInstance.post('/auth/logout');
      router.push("/login"); // Kullanıcıyı login sayfasına yönlendir
   };

   return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");

   return context;
};

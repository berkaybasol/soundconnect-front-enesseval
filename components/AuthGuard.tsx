"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthGuardProps {
   children: ReactNode;
   allowedRoles?: string[]; // Bu sayfa için izin verilen roller (opsiyonel)
}

export const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
   const { isAuthenticated, isLoading, roles } = useAuth();
   const router = useRouter();

   useEffect(() => {
      // Yükleme tamamlanmadıysa veya kullanıcı zaten kimlik doğrulamışsa ve roller uygunsa bir şey yapma
      if (isLoading) {
         console.log("[AuthGuard] Auth state is loading...");
         return; // Yükleme bitene kadar bekle
      }

      if (!isAuthenticated) {
         console.log("[AuthGuard] User not authenticated. Redirecting to /login.");
         router.push(`/`); // Giriş sonrası geri dönmek için redirect query'si ekle
         return;
      }

      // İzin verilen roller tanımlanmışsa ve kullanıcının rolleri eşleşmiyorsa
      if (allowedRoles && allowedRoles.length > 0) {
         const hasRequiredRole = roles.some((role) => allowedRoles.includes(role));
         if (!hasRequiredRole) {
            console.log("[AuthGuard] User does not have required roles. Redirecting to /unauthorized or /.");
            router.push("/unauthorized"); // Veya ana sayfaya: router.push('/');
            return;
         }
      }
      console.log("[AuthGuard] User authenticated and has required roles (if any). Access granted.");
   }, [isAuthenticated, isLoading, roles, router, allowedRoles]);

   // Yükleme sırasında veya kimlik doğrulaması başarısızsa (yönlendirme gerçekleşene kadar) boş veya bir yükleyici göster
   if (isLoading || !isAuthenticated) {
      return <div>Yükleniyor...</div>; // Veya daha iyi bir loading spinner
   }

   // İzin verilen roller varsa ve kullanıcının rolü yoksa (yönlendirme gerçekleşene kadar)
   if (allowedRoles && allowedRoles.length > 0 && !roles.some((role) => allowedRoles.includes(role))) {
      return <div>Yetkisiz erişim... Yönlendiriliyorsunuz...</div>;
   }

   // Kimlik doğrulaması başarılı ve roller uygunsa içeriği göster
   return <>{children}</>;
};

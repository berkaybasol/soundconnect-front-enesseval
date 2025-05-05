"use client"; // Event handlers için Client Component
import React from "react";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button"; // Button import edildi

// Props tipini tanımla
interface InitialActionsProps {
   onLoginClick: () => void;
   onSignupClick: () => void;
   // Google butonu için de bir handler eklenebilir: onGoogleClick?: () => void;
}

function InitialActions({ onLoginClick, onSignupClick }: InitialActionsProps) {
   return (
      // Kapsayıcıyı ortalamak için flex ve items-center/justify-center
      // Animasyon için motion.div'e dönüştürülecek (app/page.tsx içinde)
      <div className="flex flex-col items-center space-y-4 w-full max-w-xs md:max-w-sm">
         {/* Slogan */}
         <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">The Sound of Connection Starts Here.</h2>

         {/* Butonlar (Shadcn Button kullanıldı) */}
         <Button onClick={onLoginClick} className="w-full bg-gradient-to-br from-[#fd8a49] to-[#8d75ff] hover:opacity-80 transition-opacity cursor-pointer">
            Giriş Yap
         </Button>
         <Button
            onClick={onSignupClick}
            variant="outline" // Outline stili
            className="w-full bg-white/10 border-white/20 hover:bg-white/20 hover:text-white text-white cursor-pointer"
         >
            Kaydol
         </Button>

         {/* Ayırıcı */}
         <div className="w-full flex items-center space-x-2 my-2">
            <Separator className="flex-1 bg-white/20" />
            <span className="text-gray-400 text-sm">veya</span>
            <Separator className="flex-1 bg-white/20" />
         </div>

         {/* Google ile Devam Et Butonu (Shadcn Button kullanıldı) */}
         <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer">
            <FcGoogle className="mr-2 h-4 w-4" />
            <span className="text-white">Google ile devam et</span>
         </Button>
      </div>
   );
}

export default InitialActions;

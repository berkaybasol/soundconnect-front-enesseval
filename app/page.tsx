"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundLogo from "@/components/background-logo"; // Sabit kısım
import InitialActions from "@/components/initial-actions"; // Başlangıç butonları
import LoginForm from "@/components/login-form";
import SignupForm from "@/components/signup-form";

// Görünüm state'i tipleri
type ViewState = "initial" | "login" | "signup";

export default function Home() {
   const [viewState, setViewState] = useState<ViewState>("initial");

   // State değiştirme fonksiyonları
   const showLogin = () => setViewState("login");
   const showSignup = () => setViewState("signup");
   const showInitial = () => setViewState("initial"); // Geri dönmek için

   // Animasyon varyantları (içerik değişimi için)
   const contentVariants = {
      hidden: { opacity: 0, y: 30, scale: 0.98 },
      visible: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -30, scale: 0.98 },
   };

   const transition = { type: "spring", stiffness: 150, damping: 20 };

   return (
      // Ana kapsayıcı
      <div className="relative w-full h-screen overflow-hidden flex flex-col items-center">
         {/* Sabit Arka Plan ve Logo */}
         <BackgroundLogo />

         {/* Değişen İçerik Alanı (Logo'nun altına ortalanacak) */}
         {/* `absolute` ve `transform` ile ortalama */}
         <div className="w-full px-4 flex justify-center">
            <AnimatePresence mode="wait">
               {/* InitialActions Gösterimi */}
               {viewState === "initial" && (
                  <motion.div
                     key="initial"
                     initial="hidden"
                     animate="visible"
                     exit="exit"
                     variants={contentVariants}
                     transition={transition}
                     className="w-full max-w-xs md:max-w-sm" // Genişliği ayarla
                  >
                     <InitialActions onLoginClick={showLogin} onSignupClick={showSignup} />
                  </motion.div>
               )}

               {/* LoginForm Gösterimi */}
               {viewState === "login" && (
                  <motion.div
                     key="login"
                     initial="hidden"
                     animate="visible"
                     exit="exit"
                     variants={contentVariants}
                     transition={transition}
                     className="w-full flex justify-center" // LoginForm kendi genişliğini ayarlar
                  >
                     {/* LoginForm zaten card stilini içeriyor */}
                     <LoginForm onBack={showInitial} />
                  </motion.div>
               )}

               {/* SignupForm Gösterimi */}
               {viewState === "signup" && (
                  <motion.div
                     key="signup"
                     initial="hidden"
                     animate="visible"
                     exit="exit"
                     variants={contentVariants}
                     transition={transition}
                     className="w-full flex justify-center" // SignupForm kendi genişliğini ayarlar
                  >
                     {/* SignupForm zaten card stilini içeriyor */}
                     <SignupForm onBack={showInitial} />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
}

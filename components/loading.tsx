"use client"; // Mark this as a Client Component
import React from "react";
import { motion } from "framer-motion"; // Import motion
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

// Props tipini tanımla
interface LoadingProps {
   onLoginClick: () => void;
   onSignupClick: () => void;
   isFormActive: boolean; // Form aktifken butonları gizlemek veya stilini değiştirmek için
}

function Loading({ onLoginClick, onSignupClick, isFormActive }: LoadingProps) {
   // Animasyon varyantları
   const barVariants = {
      animate: (i: number) => ({
         // Farklı başlangıç ve bitiş yükseklikleri ve sürelerle rastgelelik hissi verelim
         height: ["2rem", `${4 + i * 2}rem`, "2rem"], // Örn: h-8, h-14, h-20, h-26, h-8
         transition: {
            duration: 0.8 + i * 0.2, // Her çubuk için farklı süre
            repeat: Infinity,
            repeatType: "mirror" as const, // Gidip gelme efekti - ESLint kuralı için 'as const' kullan
            ease: "easeInOut", // Yumuşak geçiş
         },
      }),
   };

   return (
      // Ana kapsayıcıyı dikey ve ortalanmış hale getir (z-50 kaldırıldı)
      <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center overflow-hidden p-4">
         {/* Arka Plan Videosu ve Karartma */}
         <div className="absolute inset-0 z-[-2]">
            {" "}
            {/* Arka plan elemanları hala en altta */}
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
               <source src="/bg-video.mp4" type="video/mp4" />
               Tarayıcınız video etiketini desteklemiyor.
            </video>
         </div>
         <div className="absolute inset-0 bg-black/85 z-[-1]"></div>

         {/* Üst Bölüm: Animasyonlu Logo ve Metin */}
         <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12">
            {" "}
            {/* Altına boşluk ekle */}
            {/* Animasyonlu Çubuklar */}
            {/* items-center ile çubukları dikeyde ortala, h-36 ile maksimum yüksekliği belirle */}
            <div className="flex items-center space-x-2 h-36">
               {[0, 1, 2, 3].map((i) => (
                  <motion.div
                     key={i}
                     className="w-3 md:w-4 rounded-md bg-gradient-to-b from-[#fd8a49] to-[#8d75ff]"
                     variants={barVariants}
                     animate="animate"
                     custom={i} // Index'i varyanta gönder
                  />
               ))}
            </div>
            {/* Metin */}
            <div className="flex flex-col items-center bg-gradient-to-br from-[#fd8a49] to-[#8d75ff] bg-clip-text">
               <p className="uppercase text-4xl md:text-5xl font-bold text-transparent tracking-tight leading-tight md:leading-tight">sound</p>
               <p className="uppercase text-4xl md:text-5xl font-bold text-transparent tracking-tight leading-tight md:leading-tight">connect</p>
            </div>
         </div>

         {/* Alt Bölüm: Slogan ve Butonlar */}
         <div className="flex flex-col items-center space-y-4 w-full max-w-xs md:max-w-sm">
            {/* Slogan */}
            {/* Sloganı daha belirgin yap (font-extrabold, mb-8) */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">The Sound of Connection Starts Here.</h2>

            {/* Butonlar - Form aktif değilse göster */}
            {!isFormActive && (
               <>
                  <button
                     onClick={onLoginClick} // Tıklama olayını prop'tan al
                     className="w-full h-10 rounded-lg text-white font-semibold bg-gradient-to-br from-[#fd8a49] to-[#8d75ff] hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                     Giriş Yap
                  </button>
                  <button
                     onClick={onSignupClick} // Tıklama olayını prop'tan al
                     className="w-full h-10 rounded-lg text-white font-semibold bg-white/10 border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer"
                  >
                     Kaydol
                  </button>

                  {/* Ayırıcı */}
                  <div className="w-full flex items-center space-x-2 my-2">
                     <Separator className="flex-1 bg-white/20" />
                     <span className="text-gray-400 text-sm">veya</span>
                     <Separator className="flex-1 bg-white/20" />
                  </div>

                  {/* Google ile Devam Et Butonu */}
                  <button className="w-full h-10 rounded-lg text-white font-semibold bg-white/10 border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                     <FcGoogle />
                     <span>Google ile devam et</span>
                  </button>
               </>
            )}
         </div>
      </div>
   );
}

export default Loading;

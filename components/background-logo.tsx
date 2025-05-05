"use client"; // Framer Motion için Client Component
import React from "react";
import { motion } from "framer-motion";

// Animasyon varyantları (loading.tsx'den alındı)
const barVariants = {
   animate: (i: number) => ({
      height: ["2rem", `${4 + i * 2}rem`, "2rem"],
      transition: {
         duration: 0.8 + i * 0.2,
         repeat: Infinity,
         repeatType: "mirror" as const,
         ease: "easeInOut",
      },
   }),
};

function BackgroundLogo() {
   return (
      <>
         {/* Arka Plan Videosu ve Karartma (Her zaman görünür) */}
         <div className="absolute inset-0 z-[-2]">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
               <source src="/bg-video.mp4" type="video/mp4" />
               Tarayıcınız video etiketini desteklemiyor.
            </video>
         </div>
         <div className="absolute inset-0 bg-black/85 z-[-1]"></div>

         {/* Üst Bölüm: Animasyonlu Logo ve Metin (Her zaman görünür) */}
         {/* Konumlandırma için absolute ve top/left/right kullanıldı */}
         <div className="flex items-center space-x-2 md:space-x-4 mt-28 mb-6">
            {/* Animasyonlu Çubuklar */}
            <div className="flex items-center space-x-2 h-36">
               {[0, 1, 2, 3].map((i) => (
                  <motion.div key={i} className="w-3 md:w-4 rounded-md bg-gradient-to-b from-[#FB7C3E] to-[#9141E4]" variants={barVariants} animate="animate" custom={i} />
               ))}
            </div>
            {/* Metin */}
            <div className="flex flex-col items-center bg-gradient-to-br from-[#FB7C3E] to-[#9141E4] bg-clip-text">
               <p className="uppercase text-4xl md:text-5xl font-bold text-transparent tracking-tight leading-tight md:leading-tight">sound</p>
               <p className="uppercase text-4xl md:text-5xl font-bold text-transparent tracking-tight leading-tight md:leading-tight">connect</p>
            </div>
         </div>
      </>
   );
}

export default BackgroundLogo;

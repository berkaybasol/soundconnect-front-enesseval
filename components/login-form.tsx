"use client";

import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface LoginFormProps {
   onBack: () => void; // Geri dönme fonksiyonu
}

const LoginForm = ({ onBack }: LoginFormProps) => {
   return (
      <Card className="w-full max-w-sm bg-gradient-to-br from-gray-900/80 to-black/80 border-white/20 text-white">
         <CardHeader className="relative items-center text-center">
            <div className="flex relative justify-center">
               <Button variant="link" size="icon" onClick={onBack} className="absolute left-0 cursor-pointer" aria-label="Geri">
                  <IoArrowBack className="h-5 w-5 text-white" />
               </Button>
               <CardTitle className="text-2xl">Giriş Yap</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="space-y-2">
               <Label htmlFor="email">E-posta</Label>
               <Input id="email" type="email" placeholder="ornek@eposta.com" required className="bg-white/10 border-white/20 focus:ring-[#fd8a49]/50 placeholder:text-gray-400" />
            </div>
            <div className="space-y-2">
               <Label htmlFor="password">Şifre</Label>
               <Input id="password" type="password" required className="bg-white/10 border-white/20 focus:ring-[#fd8a49]/50" />
            </div>
         </CardContent>
         <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-gradient-to-br from-[#FB7C3E] to-[#9141E4] hover:opacity-90 transition-opacity">Giriş Yap</Button>
            <div className="w-full flex items-center space-x-2">
               <Separator className="flex-1 bg-white/20" />
               <span className="text-gray-400 text-sm">veya</span>
               <Separator className="flex-1 bg-white/20" />
            </div>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20">
               <FcGoogle className="mr-2 h-4 w-4" /> Google ile devam et
            </Button>
         </CardFooter>
      </Card>
   );
};

export default LoginForm;

"use client";

import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { loginSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { loginUser } from "@/lib/api/auth";

interface LoginFormProps {
   onBack: () => void; // Geri dönme fonksiyonu
}

const LoginForm = ({ onBack }: LoginFormProps) => {
   const [loading, setLoading] = useState(false);

   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      mode: "onBlur",
      defaultValues: {
         username: "",
         password: "",
      },
   });

   const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
      setLoading(true);
      const toastId = toast.loading("Giriş yapılıyor...");

      try {
         await loginUser(values);
         toast.success("Giriş başarılı!", { id: toastId });
         // form.reset(); // Formu sıfırlamak isteyebilirsiniz
      } catch (error) {
         toast.error(error instanceof Error ? error.message : "Giriş sırasında bir hata oluştu.", {
            id: toastId,
         });
      } finally {
         setLoading(false);
      }
   };

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
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" id="login-form-hook">
                  <FormField
                     control={form.control}
                     name="username"
                     render={({ field }) => (
                        <FormItem className="grid-cols-1">
                           <FormControl>
                              <Input placeholder="Kullanıcı Adı" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem className="grid-cols-1">
                           {/* <FormLabel>Şifre</FormLabel> */}
                           <FormControl>
                              <Input type="password" placeholder="Şifre" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </form>
            </Form>
         </CardContent>
         <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" form="login-form-hook" className="w-full bg-gradient-to-br from-[#FB7C3E] to-[#9141E4] hover:opacity-90 transition-opacity cursor-pointer" disabled={loading}>
               Giriş Yap
            </Button>
            <div className="w-full flex items-center space-x-2">
               <Separator className="flex-1 bg-white/20" />
               <span className="text-gray-400 text-sm">veya</span>
               <Separator className="flex-1 bg-white/20" />
            </div>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer">
               <FcGoogle className="mr-2 h-4 w-4" /> Google ile devam et
            </Button>
         </CardFooter>
      </Card>
   );
};

export default LoginForm;

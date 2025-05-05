"use client";

import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select eklendi
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"; // sonner'ı import et
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { turkishCities } from "@/lib/constants"; // Şehir listesini import et
import { registerUser } from "@/lib/api/auth"; // Yeni API fonksiyonunu import et

interface SignupFormProps {
   onBack: () => void; // Geri dönme fonksiyonu
}

const SignupForm = ({ onBack }: SignupFormProps) => {
   const form = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      mode: "onBlur", // Doğrulamayı onBlur'da tetikle
      defaultValues: {
         // Başlangıç değerlerini ekle
         username: "",
         email: "",
         phone: "", // Formatlama +90 ekleyecek
         gender: undefined, // Select için undefined uygun
         city: "", // Select için boş string deneyelim
         password: "",
         passwordConfirm: "",
      },
   });

   // Yüklenme durumu için state ekleyelim
   const [isLoading, setIsLoading] = React.useState(false);
   // const [apiError, setApiError] = React.useState<string | null>(null); // API hatası state'ini kaldırıyoruz

   const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
      setIsLoading(true); // Yüklenmeyi başlat
      // setApiError(null); // Önceki hatayı temizle - kaldırıldı
      const loadingToastId = toast.loading("Hesap oluşturuluyor..."); // Yükleme toast'ını göster
      console.log("Form verileri:", values);

      // API'ye gönderilecek veriyi hazırla
      // Telefon numarasının maskesini kaldır (+90XXXXXXXXXX formatına getir)
      const unmaskedPhone = "+" + values.phone.replace(/\D/g, ""); // Sadece rakamları al ve başına + ekle

      const userData = {
         username: values.username,
         email: values.email,
         phone: unmaskedPhone, // Maskesiz numarayı gönder
         gender: values.gender,
         city: values.city,
         password: values.password,
      };

      try {
         // Yeni API fonksiyonunu çağır (dönüşümsüz veri ile)
         const result = await registerUser(userData);
         console.log("Kayıt başarılı (axios):", result);
         toast.success("Hesap başarıyla oluşturuldu!", { id: loadingToastId }); // Başarı toast'ını göster

         // TODO: Başarı durumunda kullanıcıyı yönlendir veya mesaj göster
         // Örneğin: router.push('/login') veya bir başarı mesajı state'i güncelle
      } catch (error) {
         // :any kaldırıldı
         // Hata tipini kontrol et
         let errorMessage = "Bilinmeyen bir hata oluştu.";
         if (error instanceof Error) {
            errorMessage = error.message; // Error instance ise mesajını kullan
         } else if (typeof error === "string") {
            errorMessage = error; // String ise doğrudan kullan
         }
         console.error("Kayıt sırasında hata (axios):", error);
         // registerUser fonksiyonu zaten anlamlı bir hata mesajı fırlatıyor olmalı
         toast.error(`Kayıt başarısız: ${errorMessage}`, { id: loadingToastId }); // Hata toast'ını göster
      } finally {
         setIsLoading(false); // Her durumda yüklenmeyi bitir
      }
   };

   return (
      <Card className="w-full max-w-lg bg-gradient-to-br from-gray-900/80 to-black/80 border-white/20 text-white">
         <CardHeader className="relative items-center text-center">
            <div className="flex relative justify-center">
               <Button variant="link" size="icon" onClick={onBack} className="absolute left-0 cursor-pointer" aria-label="Geri">
                  <IoArrowBack className="h-5 w-5 text-white" />
               </Button>
               <CardTitle className="text-2xl">Hesap Oluştur</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid gap-3 grid-cols-2">
                     <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                           <FormItem className="grid-cols-1">
                              {/* <FormLabel>Kullanıcı Adı</FormLabel> */}
                              <FormControl>
                                 {/* onChange gereksiz, {...field} hallediyor */}
                                 <Input placeholder="Kullanıcı Adı" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* Telefon Numarası Alanı */}
                     <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    placeholder="+90 (XXX) XXX XX XX"
                                    {...field} // onBlur, ref, value vb. için field'ı spread et
                                    // Explicit value prop'unu kaldır, {...field} zaten içeriyor
                                    onChange={(e) => {
                                       // onChange'i üzerine yaz
                                       let input = e.target.value.replace(/\D/g, ""); // Sadece rakamları al
                                       const prefix = "90";

                                       // Eğer +90 ile başlıyorsa, onu koru ama sonraki işlemlerde kullanma
                                       if (input.startsWith(prefix)) {
                                          input = input.substring(prefix.length);
                                       }

                                       // En fazla 10 rakam al (alan kodu + numara)
                                       input = input.substring(0, 10);

                                       let formatted = "+90";
                                       if (input.length > 0) {
                                          formatted += ` (${input.substring(0, 3)}`;
                                       }
                                       if (input.length >= 4) {
                                          formatted += `) ${input.substring(3, 6)}`;
                                       }
                                       if (input.length >= 7) {
                                          formatted += ` ${input.substring(6, 8)}`;
                                       }
                                       if (input.length >= 9) {
                                          formatted += ` ${input.substring(8, 10)}`;
                                       }

                                       // Sadece formatlanmış değeri state'e gönder
                                       field.onChange(formatted);
                                    }}
                                    maxLength={19} // Format: +90 (XXX) XXX XX XX (19 karakter)
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem className="grid-cols-1">
                           {/* <FormLabel>E-posta</FormLabel> */}
                           <FormControl>
                              {/* onChange gereksiz, {...field} hallediyor */}
                              <Input type="email" placeholder="example@mail.com" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="grid gap-3 grid-cols-2">
                     {/* Cinsiyet Alanı */}
                     <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                           <FormItem>
                              {/* defaultValue'ı kaldır, FormField hallediyor */}
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                 <FormControl>
                                    {/* SelectTrigger'a onBlur ekleyelim */}
                                    <SelectTrigger className="col-span-1 w-full" onBlur={field.onBlur}>
                                       <SelectValue placeholder="Cinsiyet seçiniz" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent className="bg-primary text-white">
                                    <SelectItem value="male">Erkek</SelectItem>
                                    <SelectItem value="female">Kadın</SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* Şehir Alanı (Select olarak değiştirildi) */}
                     <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                           <FormItem>
                              {/* defaultValue'ı kaldır, FormField hallediyor */}
                              <Select onValueChange={field.onChange} value={field.value || ""}>
                                 <FormControl>
                                    {/* SelectTrigger'a onBlur ekleyelim */}
                                    <SelectTrigger className="col-span-1 w-full" onBlur={field.onBlur}>
                                       <SelectValue placeholder="Şehir seçiniz" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent className="bg-primary text-white">
                                    {turkishCities.map((city) => (
                                       <SelectItem key={city} value={city}>
                                          {city}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  {/* Şifre Alanı */}
                  <div className="grid gap-3 grid-cols-2">
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem className="grid-cols-1">
                              {/* <FormLabel>Şifre</FormLabel> */}
                              <FormControl>
                                 {/* onChange gereksiz, {...field} hallediyor */}
                                 <Input type="password" placeholder="Şifre" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* Şifre Tekrarı Alanı */}
                     <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                           <FormItem className="grid-cols-1">
                              {/* <FormLabel>Şifre Tekrarı</FormLabel> */}
                              <FormControl>
                                 {/* onChange gereksiz, {...field} hallediyor */}
                                 <Input type="password" placeholder="Şifre Tekrarı" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  {/* Hata mesajı gösterimini kaldırıyoruz */}
                  {/* {apiError && <p className="text-sm font-medium text-destructive mb-4">{apiError}</p>} */}
                  <Button type="submit" className="w-full bg-gradient-to-br from-[#FB7C3E] to-[#9141E4] hover:opacity-90 transition-opacity" disabled={isLoading}>
                     Kayıt Ol
                  </Button>
               </form>
            </Form>
         </CardContent>
         <CardFooter className="flex flex-col space-y-4 pt-4">
            {" "}
            {/* pt-4 eklendi */}
            {/* Ayırıcı */}
            <div className="w-full flex items-center space-x-2">
               <Separator className="flex-1 bg-white/20" />
               <span className="text-xs text-gray-400">VEYA</span> {/* Stil güncellendi */}
               <Separator className="flex-1 bg-white/20" />
            </div>
            {/* Google ile Devam Et Butonu */}
            <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20">
               <FcGoogle className="mr-2 h-4 w-4" /> Google ile devam et
            </Button>
         </CardFooter>
      </Card>
   );
};

export default SignupForm;

"use client";

import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Role } from "@/types/role.types";
import { LoaderIcon } from "lucide-react";
import axiosInstance from "@/lib/axios-instance";
import { useTranslations } from "next-intl";
import { createRegisterSchema, RegisterFormData } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function RegisterForm({ onBack }: { onBack: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [roles, setRoles] = useState<Role[] | null>(null);
  const router = useRouter();

  const registerIntl = useTranslations("registerForm");

  const registerSchema = createRegisterSchema(registerIntl);

  useEffect(() => {
    const getRoles = async () => {
      try {
        setRolesLoading(true);
        const res = await axiosInstance.get("/roles/get-all-roles");

        if (res.data && res.data.success) {
          const filteredRole = res.data.data.filter(
            (role: Role) =>
              role.name !== "ROLE_OWNER" &&
              role.name !== "ROLE_USER" &&
              role.name !== "ROLE_ADMIN"
          );
          setRoles(filteredRole);
        } else {
          console.log(res.data);
          toast.error("Roller yüklenirken bir hata oluştu");
        }
      } catch (error) {
        console.error("Roller yüklenirken hata:", error);
        toast.error(
          "Roller yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin."
        );
        setRoles([]);
      } finally {
        setRolesLoading(false);
      }
    };
    getRoles();
  }, []);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      rePassword: "",
      role: "",
    },
  });

  const handleSubmit = async (values: RegisterFormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Kayıt işlemi yapılıyor...");

    try {
      // API çağrısı burada yapılacak
      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
        rePassword: values.rePassword,
        role: values.role,
      };

      const response = await axiosInstance.post("auth/register", userData);

      toast.success(
        "Kayıt başarılı, hesabınızı doğrulamanız için mail adresinizi kontrol ediniz.",
        {
          id: toastId,
        }
      );

      router.push("/verify-email/info?email=" + values.email);
    } catch (error) {
      let errorMessage = "Bilinmeyen bir hata oluştu.";
      if (error instanceof Error) {
        errorMessage = error.message; // Error instance ise mesajını kullan
      } else if (typeof error === "string") {
        errorMessage = error; // String ise doğrudan kullan
      }
      // registerUser fonksiyonu zaten anlamlı bir hata mesajı fırlatıyor olmalı
      toast.error(`Kayıt başarısız: ${errorMessage}`, { id: toastId }); // Hata toast'ını ID ile güncelle
    } finally {
      setIsLoading(false); // Her durumda yüklenmeyi bitir
    }
  };

  return (
    <Card className="w-full max-w-lg bg-gradient-to-br from-gray-900/80 to-black/80 border-white/20 text-white">
      <CardHeader className="relative items-center text-center">
        <div className="flex relative justify-center">
          <Button
            variant="link"
            size="icon"
            onClick={onBack}
            className="absolute left-0 cursor-pointer"
            aria-label="Geri"
          >
            <IoArrowBack className="h-5 w-5 text-white" />
          </Button>
          <CardTitle className="text-2xl">Hesap Oluştur</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Kullanıcı Adı */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Kullanıcı Adı"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* E-posta */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@mail.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Şifre Alanları */}
            <div className="grid gap-3 grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Şifre"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Şifre Tekrarı"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rol Seçimi */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    {roles !== null ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white w-full">
                            <SelectValue
                              placeholder="Rol seçiniz"
                              className="text-gray-400"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-white/20">
                          {roles.map((role) => (
                            <SelectItem
                              key={role.name}
                              value={role.name}
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              {registerIntl(role.name)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select>
                        <SelectTrigger className="w-full">
                          <div className="w-fit mx-auto flex justify-center">
                            <LoaderIcon className="animate-spin text-white ml-5" />
                          </div>
                        </SelectTrigger>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-br from-[#FB7C3E] to-[#9141E4] hover:opacity-90 transition-opacity"
              disabled={isLoading || roles === null}
            >
              {isLoading ? "Kayıt Oluşturuluyor..." : "Kayıt Ol"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pt-4">
        <div className="w-full flex items-center space-x-2">
          <Separator className="flex-1 bg-white/20" />
          <span className="text-xs text-gray-400">VEYA</span>
          <Separator className="flex-1 bg-white/20" />
        </div>
        <Button
          variant="outline"
          className="w-full bg-white/10 border-white/20 hover:bg-white/20"
        >
          <FcGoogle className="mr-2 h-4 w-4" /> Google ile devam et
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;

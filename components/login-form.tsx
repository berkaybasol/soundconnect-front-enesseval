import { createLoginSchema, LoginFormData } from "@/schemas/auth.schema";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios-instance";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/api.types";

function LoginForm({ onBack }: { onBack: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const loginIntl = useTranslations("loginForm");
  const loginSchema = createLoginSchema(loginIntl);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Giriş yapılıyor...");

    try {
      const res = await axiosInstance.post("/auth/login", values);
      console.log(res.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.details?.[0] || "Bir hata oluştu";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsLoading(false);
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
          <CardTitle className="text-2xl">Giriş Yap</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
            <Button
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-br from-[#FB7C3E] to-[#9141E4] hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
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

export default LoginForm;

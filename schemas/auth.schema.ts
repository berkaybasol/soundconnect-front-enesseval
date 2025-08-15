import { z } from "zod";

// Şifre regex pattern'i: en az 1 büyük harf, 1 küçük harf, 1 rakam, 1 özel karakter
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Client-side için schema factory fonksiyonu
export const createRegisterSchema = (t: (key: string) => string) => {
  return z
    .object({
      username: z.string().min(3, t("usernameMinLength")),
      email: z.string().email(t("emailInvalid")),
      password: z
        .string()
        .min(8, t("passwordMinLength"))
        .max(20, t("passwordMaxLength"))
        .regex(passwordRegex, t("passwordComplexity")),
      rePassword: z.string().min(8, t("rePasswordMinLength")),
      role: z.string().min(1, t("roleRequired")),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("passwordMismatch"),
      path: ["rePassword"],
    });
};

export const createLoginSchema = (t: (key: string) => string) => {
    return z.object({
        username: z.string().min(3, t("usernameMinLength")),
        password: z
        .string()
        .min(8, t("passwordMinLength"))
        .max(20, t("passwordMaxLength"))
        .regex(passwordRegex, t("passwordComplexity")),
    })
}

// Tip tanımlaması
export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;


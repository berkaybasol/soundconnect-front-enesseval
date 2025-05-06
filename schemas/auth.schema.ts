import { z } from "zod";

export const registerSchema = z
   .object({
      // .min(1) yerine .nonempty() kullanalım
      username: z.string().nonempty({ message: "Kullanıcı adı alanı boş bırakılamaz." }),
      email: z.string().nonempty({ message: "E-posta alanı boş bırakılamaz." }).email({ message: "Lütfen geçerli bir e-posta adresi giriniz." }),
      phone: z
         .string()
         .nonempty({ message: "Telefon numarası boş bırakılamaz." })
         .regex(/^\+90 \(\d{3}\) \d{3} \d{2} \d{2}$/, {
            message: "Telefon numarası formatı geçersiz.",
         }),
      // Cinsiyet alanını gerekli yap ve hata mesajı ekle
      gender: z.enum(["male", "female"], {
         required_error: "Lütfen cinsiyet seçiniz.",
         invalid_type_error: "Geçersiz cinsiyet değeri.",
      }),
      // .nonempty() kullanalım ve ek olarak refine ile boş string kontrolü yapalım
      city: z.string().nonempty({ message: "Şehir alanı boş bırakılamaz." }), // Genel boş olmama kontrolü
      // Şifre alanını da boş olamaz olarak işaretle (.nonempty ile)
      password: z
         .string()
         .nonempty({ message: "Şifre alanı boş bırakılamaz." }) // .nonempty() kullanalım
         .min(8, { message: "Şifre en az 8 karakter olmalıdır." })
         .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermelidir." })
         .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermelidir." })
         .regex(/[0-9]/, { message: "Şifre en az bir rakam içermelidir." })
         .regex(/[^a-zA-Z0-9]/, { message: "Şifre en az bir sembol içermelidir." }),
      // Şifre tekrarı alanını da boş olamaz olarak işaretle (.nonempty ile)
      passwordConfirm: z.string().nonempty({ message: "Şifre tekrarı alanı boş bırakılamaz." }),
   })
   .refine((data) => data.password === data.passwordConfirm, {
      message: "Şifreler eşleşmiyor.",
      path: ["passwordConfirm"], // Hatanın hangi alana ait olduğunu belirtir
   });

export const loginSchema = z.object({
   username: z.string().nonempty({ message: "Kullanıcı adı alanı boş bırakılamaz." }),
   password: z
      .string()
      .nonempty({ message: "Şifre alanı boş bırakılamaz." })
      .min(8, { message: "Şifre en az 8 karakter olmalıdır." })
      .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermelidir." })
      .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermelidir." })
      .regex(/[0-9]/, { message: "Şifre en az bir rakam içermelidir." })
      .regex(/[^a-zA-Z0-9]/, { message: "Şifre en az bir sembol içermelidir." }),
});

import axios, { AxiosError } from "axios"; // AxiosError tipi için hala gerekli
import { z } from "zod";
import { loginSchema, registerSchema } from "@/schemas/auth.schema"; // Şemayı import edelim, payload tipini belirlemek için
import { axiosInstance } from "@/lib/axiosInstance"; // Oluşturduğumuz instance'ı import et

// Fonksiyona gönderilecek payload tipi (şemadan türetilmiş)
type RegisterInput = Omit<z.infer<typeof registerSchema>, "passwordConfirm">;

/**
 * Kullanıcı kayıt isteğini gönderir.
 * @param payload Kayıt verileri
 * @returns API yanıtı
 * @throws AxiosError veya genel Error - Hata durumunda fırlatılır
 */
export const registerUser = async (inputData: RegisterInput) => {
   // API'nin beklediği formata dönüştürme
   const apiPayload = {
      ...inputData,
      phone: inputData.phone.replace(/[()\s]/g, ""), // Formatı temizle
      gender: inputData.gender.toUpperCase(), // Büyük harfe çevir
      city: inputData.city,
      rePassword: inputData.password, // rePassword ekle
   };

   try {
      const response = await axiosInstance.post("/auth/register", apiPayload);

      return response.data; // Başarılı yanıtın verisini döndür
   } catch (error) {
      // Axios hatası mı kontrol et
      if (axios.isAxiosError(error)) {
         console.log(error);
         // Hata yanıtının tipini unknown olarak belirtelim
         const axiosError = error as AxiosError<unknown>;
         // Sunucudan gelen bir hata yanıtı var mı?
         if (axiosError.response) {
            let apiErrorMessage = `API Hatası: ${axiosError.response.status}`;
            // Hata verisinin yapısını kontrol etmeye çalışalım
            const responseData = axiosError.response.data as any; // Daha esnek tip tanımı
            if (responseData && responseData.details && Array.isArray(responseData.details) && responseData.details.length > 0 && typeof responseData.details[0] === "string") {
               // Eğer response.data.details bir dizi ve ilk elemanı string ise onu kullan
               apiErrorMessage = responseData.details[0];
            } else if (typeof responseData === "object" && responseData !== null && "message" in responseData && typeof responseData.message === "string") {
               // Eğer { message: '...' } formatında ise mesajı kullan
               apiErrorMessage = responseData.message;
            } else if (typeof responseData === "string" && responseData.length > 0) {
               // Eğer sadece string ise onu kullan
               apiErrorMessage = responseData;
            } else {
               // Diğer durumlarda JSON'a çevirmeyi dene veya status kodunu kullan
               try {
                  apiErrorMessage = JSON.stringify(responseData);
               } catch {
                  // JSON'a çevrilemezse status kodunda kal
               }
            }
            throw new Error(apiErrorMessage);
         } else if (axiosError.request) {
            // İstek yapıldı ama yanıt alınamadı (örn. ağ hatası)
            throw new Error("Sunucuya ulaşılamadı. Ağ bağlantınızı kontrol edin.");
         } else {
            // İsteği ayarlarken bir hata oluştu
            throw new Error(`İstek gönderilirken bir hata oluştu: ${axiosError.message}`);
         }
      } else {
         // Axios dışı bir hata
         throw new Error("Beklenmedik bir hata oluştu.");
      }
   }
};

// Fonksiyona gönderilecek payload tipi (şemadan türetilmiş)
type LoginInput = z.infer<typeof loginSchema>;

/**
 * Kullanıcı giriş isteğini gönderir.
 * @param inputData Giriş verileri
 * @returns API yanıtı
 * @throws AxiosError veya genel Error - Hata durumunda fırlatılır
 */
export const loginUser = async (inputData: LoginInput) => {
   try {
      const response = await axiosInstance.post("/auth/login", inputData);
      return response.data; // Başarılı yanıtın verisini döndür
   } catch (error) {
      // Axios hatası mı kontrol et
      if (axios.isAxiosError(error)) {
         // Hata yanıtının tipini unknown olarak belirtelim
         const axiosError = error as AxiosError<unknown>;
         // Sunucudan gelen bir hata yanıtı var mı?
         if (axiosError.response) {
            let apiErrorMessage = `API Hatası: ${axiosError.response.status}`;
            // Hata verisinin yapısını kontrol etmeye çalışalım
            const responseData = axiosError.response.data as any; // Daha esnek tip tanımı
            if (responseData && responseData.details && Array.isArray(responseData.details) && responseData.details.length > 0 && typeof responseData.details[0] === "string") {
               // Eğer response.data.details bir dizi ve ilk elemanı string ise onu kullan
               apiErrorMessage = responseData.details[0];
            } else if (typeof responseData === "object" && responseData !== null && "message" in responseData && typeof responseData.message === "string") {
               // Eğer { message: '...' } formatında ise mesajı kullan
               apiErrorMessage = responseData.message;
            } else if (typeof responseData === "string" && responseData.length > 0) {
               // Eğer sadece string ise onu kullan
               apiErrorMessage = responseData;
            } else {
               // Diğer durumlarda JSON'a çevirmeyi dene veya status kodunu kullan
               try {
                  apiErrorMessage = JSON.stringify(responseData);
               } catch {
                  // JSON'a çevrilemezse status kodunda kal
               }
            }
            throw new Error(apiErrorMessage);
         } else if (axiosError.request) {
            // İstek yapıldı ama yanıt alınamadı (örn. ağ hatası)
            throw new Error("Sunucuya ulaşılamadı. Ağ bağlantınızı kontrol edin.");
         } else {
            // İsteği ayarlarken bir hata oluştu
            throw new Error(`İstek gönderilirken bir hata oluştu: ${axiosError.message}`);
         }
      } else {
         // Axios dışı bir hata
         throw new Error("Beklenmedik bir hata oluştu.");
      }
   }
};

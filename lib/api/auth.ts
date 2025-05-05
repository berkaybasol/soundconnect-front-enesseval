import axios, { AxiosError } from "axios"; // AxiosError tipi için hala gerekli
import { z } from "zod";
import { registerSchema } from "@/schemas/auth.schema"; // Şemayı import edelim, payload tipini belirlemek için
import { axiosInstance } from "@/lib/axiosInstance"; // Oluşturduğumuz instance'ı import et

// Fonksiyona gönderilecek payload tipi (şemadan türetilmiş)
type RegisterInput = Omit<z.infer<typeof registerSchema>, "passwordConfirm">;

// API endpoint URL'sini kaldırıyoruz, instance halledecek
// const API_URL = "https://soundconnect.dev/api/v1/auth/register";

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
      city: inputData.city.toLocaleUpperCase("tr-TR"), // Büyük harfe çevir (TR locale)
      rePassword: inputData.password, // rePassword ekle
   };

   console.log("API'ye gönderilecek (axios instance):", apiPayload);
   try {
      // Instance'ı kullanarak isteği gönder (sadece path yeterli)
      // Headers instance'dan gelecek
      const response = await axiosInstance.post("/auth/register", apiPayload);
      console.log("Axios Instance yanıtı:", response.data);
      return response.data; // Başarılı yanıtın verisini döndür
   } catch (error) {
      console.error("Axios isteği sırasında hata:", error);

      // Axios hatası mı kontrol et
      if (axios.isAxiosError(error)) {
         // Hata yanıtının tipini unknown olarak belirtelim
         const axiosError = error as AxiosError<unknown>;
         // Sunucudan gelen bir hata yanıtı var mı?
         if (axiosError.response) {
            console.error("API Hata Yanıtı:", axiosError.response.data);
            let apiErrorMessage = `API Hatası: ${axiosError.response.status}`;
            // Hata verisinin yapısını kontrol etmeye çalışalım
            const responseData = axiosError.response.data;
            if (typeof responseData === "object" && responseData !== null && "message" in responseData && typeof responseData.message === "string") {
               // Eğer { message: '...' } formatında ise mesajı kullan
               apiErrorMessage = responseData.message;
            } else if (typeof responseData === "string" && responseData.length > 0) {
               // Eğer sadece string ise onu kullan
               apiErrorMessage = responseData;
            } else {
               // Diğer durumlarda JSON'a çevirmeyi dene veya status kodunu kullan
               try {
                  apiErrorMessage = JSON.stringify(responseData);
               } catch (e) {
                  // JSON'a çevrilemezse status kodunda kal
               }
            }
            throw new Error(apiErrorMessage);
         } else if (axiosError.request) {
            // İstek yapıldı ama yanıt alınamadı (örn. ağ hatası)
            console.error("API Yanıtı Alınamadı:", axiosError.request);
            throw new Error("Sunucuya ulaşılamadı. Ağ bağlantınızı kontrol edin.");
         } else {
            // İsteği ayarlarken bir hata oluştu
            console.error("Axios Ayar Hatası:", axiosError.message);
            throw new Error(`İstek gönderilirken bir hata oluştu: ${axiosError.message}`);
         }
      } else {
         // Axios dışı bir hata
         console.error("Beklenmedik Hata:", error);
         throw new Error("Beklenmedik bir hata oluştu.");
      }
   }
};

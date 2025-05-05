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
         const axiosError = error as AxiosError<any>; // Tip belirlemesi yapalım
         // Sunucudan gelen bir hata yanıtı var mı?
         if (axiosError.response) {
            console.error("API Hata Yanıtı:", axiosError.response.data);
            // Sunucudan gelen hata mesajını veya veriyi fırlat
            // API'nizin hata formatına göre burayı özelleştirebilirsiniz
            const apiErrorMessage = axiosError.response.data?.message || JSON.stringify(axiosError.response.data);
            throw new Error(apiErrorMessage || `API Hatası: ${axiosError.response.status}`);
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

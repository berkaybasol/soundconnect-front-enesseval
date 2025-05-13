// --- LocalStorage Anahtarları (Yerel Geliştirme için) ---
const LOCAL_STORAGE_AUTH_TOKEN_KEY = "authToken_dev";
const LOCAL_STORAGE_USER_ROLES_KEY = "userRoles_dev";

interface AuthSuccessData {
   token: string;
   roles?: string[]; // Roller opsiyonel olabilir veya her zaman gelmeyebilir
   // Backend'inizden gelen diğer kullanıcı bilgileri buraya eklenebilir
   // Örneğin: userId, username, email vb.
   [key: string]: any; // Diğer olası alanlar için
}

export interface ApiAuthResponse {
   success: boolean;
   message?: string;
   code?: number;
   data?: AuthSuccessData; // Başarılı durumda bu alanın dolu olmasını bekliyoruz
   details?: string[]; // Hata durumunda backend'den gelebilecek detaylar
}

export const saveAuthDataForLocalDevelopment = (responseData: ApiAuthResponse) => {
   if (responseData && responseData.success && responseData.data?.token) {
      const token = responseData.data.token;
      const roles = responseData.data.roles;

      try {
         localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token);
         localStorage.setItem(LOCAL_STORAGE_USER_ROLES_KEY, JSON.stringify(roles));

         return { success: true, token, roles };
      } catch (error) {
         console.log(`Localstorage'a kaydedilemedi: ${error}`);
         return { success: false, message: "Localstorage'a kaydedilemedi." };
      }
   } else {
      console.error("[GELİŞTİRME] Token kaydetme başarısız: Geçersiz API yanıtı veya yanıtta token bulunamadı.", responseData);
      return { success: false, error: "API yanıtı geçersiz veya beklenen token bilgisi eksik." };
   }
};

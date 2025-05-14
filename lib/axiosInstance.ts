import axios from "axios";

// Backend API'nin temel URL'si
const BASE_URL = "https://api.soundconnect.dev/api/v1"; // Sadece base URL'i buraya alıyoruz

const LOCAL_STORAGE_AUTH_TOKEN_KEY = "authToken_dev";

export const axiosInstance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
      accept: "*/*", // Genel kabul başlığını buraya ekleyebiliriz
   },
   // Gelecekte timeout, kimlik doğrulama başlıkları vb. eklenebilir
   // timeout: 10000, // Örnek: 10 saniye timeout
});

axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

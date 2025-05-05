import axios from "axios";

// Backend API'nin temel URL'si
const BASE_URL = "https://soundconnect.dev/api/v1"; // Sadece base URL'i buraya alıyoruz

export const axiosInstance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
      accept: "*/*", // Genel kabul başlığını buraya ekleyebiliriz
   },
   // Gelecekte timeout, kimlik doğrulama başlıkları vb. eklenebilir
   // timeout: 10000, // Örnek: 10 saniye timeout
});

// İsteğe bağlı: İstek veya yanıt interceptor'ları ekleyebilirsiniz
// Örneğin, her isteğe otomatik olarak token eklemek veya hataları merkezi olarak işlemek için
/*
axiosInstance.interceptors.request.use(config => {
  // const token = localStorage.getItem('token'); // Token'ı al
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`; // Başlığa ekle
  // }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response; // Başarılı yanıtı doğrudan döndür
}, error => {
  // Hata işleme mantığı (örn. 401 Unauthorized durumunda logout yap)
  console.error("Axios Interceptor Hatası:", error.response?.data || error.message);
  return Promise.reject(error); // Hatanın devam etmesini sağla
});
*/

export interface Venue {
   id: string; // Mekan ID'si
   name: string; // Mekan adı
   address: string; // Mekan adresi
   phone: string; // Mekan telefon numarası
   website: string; // Mekan web sitesi
   description: string; // Mekan açıklaması
   musicStartTime: string; // Müzik başlama saati (örneğin: "20:00")
   cityName: string; // Şehir adı
   districtName: string; // İlçe adı
   neighborhoodName: string; // Mahalle adı
   status: "PENDING" | "ACTIVE" | "INACTIVE"; // Mekanın durumu
   ownerId: string; // Mekan sahibi ID'si
   ownerFullName: string; // Mekan sahibi adı
}

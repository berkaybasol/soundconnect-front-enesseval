# 1. Aşama: Build zamanı
FROM node:20-alpine AS builder

# Uygulama dosyalarının taşınacağı yer
WORKDIR /app

# Bağımlılıkları ve kodu kopyala
COPY package*.json ./
COPY tsconfig.json ./
COPY . .

# Bağımlılıkları yükle
RUN npm install

# Build işlemi
RUN npm run build

# 2. Aşama: Sadece çalıştırma ortamı
FROM node:20-alpine

WORKDIR /app

# Sadece çalışması için gerekenleri kopyala
COPY --from=builder /app ./

# Uygulama başlat
CMD ["npm", "run", "start"]

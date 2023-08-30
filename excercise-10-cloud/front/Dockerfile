# Etap 1: Budowanie aplikacji React
FROM node:18 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etap 2: Uruchomienie serwera HTTP
FROM nginx:alpine

# Skopiuj wyniki z etapu 1 do serwera Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Początkowe konfiguracje Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
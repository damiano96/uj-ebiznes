# Etap 1: Budowanie aplikacji Go
FROM golang:1.20 as build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=1 go build -o myapp .

# Etap 2: Budowanie obrazu finalnego
FROM ubuntu:22.04

# Instalacja SQLite i innych potrzebnych pakietów
RUN apt-get update && apt-get install -y sqlite3

WORKDIR /app

# Skopiowanie pliku wykonywalnego z etapu 1
COPY --from=build /app/myapp .

# Skopiowanie pliku bazy SQLite
COPY test.db .

# Expose port, można dostosować do swoich potrzeb
EXPOSE 1323

# Uruchomienie aplikacji
CMD ["./myapp"]
FROM golang:1.20 as build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=1 go build -o myapp .

FROM ubuntu:22.04

RUN apt-get update && apt-get install -y sqlite3
WORKDIR /app
COPY --from=build /app/myapp .
COPY test.db .
EXPOSE 1323

CMD ["./myapp"]
package models

import (
	"github.com/golang-jwt/jwt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uint `gorm:"primaryKey;autoIncrement"`
	Email    string
	Password string
}

type CustomClaims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

var (
	SecretKey = []byte("secret-key")
)

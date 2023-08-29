package controllers

import (
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"net/http"
	"server/database"
	"server/models"
	"time"
)

func generateToken(email string) (string, error) {
	claims := &models.CustomClaims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 2).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(models.SecretKey)
}

func LoginUser(c echo.Context) error {
	var db = database.GetDB()
	var user models.User
	var validUser models.User

	var err = c.Bind(&user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Nieprawidłowe dane logowania")
	}

	db.Find(&validUser, "email = ?", user.Email)
	if validUser.ID == 0 {
		return c.JSON(http.StatusNotFound, "Nieprawidłowe dane logowania")
	}

	if validUser.Password != user.Password {
		return c.JSON(http.StatusNotFound, "Nieprawidłowe dane logowania")
	}

	token, err := generateToken(validUser.Email)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Błąd generowania tokena")
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token": token,
		"email": validUser.Email,
	})
}

func RegisterUser(c echo.Context) error {
	var db = database.GetDB()
	var user models.User
	var newUser models.User

	err := c.Bind(&user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Nieprawidłowe dane")
	}

	db.Find(&newUser, "email = ?", user.Email)
	if newUser.ID != 0 {
		return c.JSON(http.StatusBadRequest, "Użytkownik już istnieje")
	}

	db.Create(&user)

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Utworzono uzytkownika",
	})
}

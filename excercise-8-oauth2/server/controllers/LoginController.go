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
		return c.JSON(http.StatusBadRequest, "Invalid data")
	}

	db.Find(&validUser, "email = ?", user.Email)
	if validUser.ID == 0 {
		return c.JSON(http.StatusNotFound, "User does not exist")
	}

	if validUser.Password != user.Password {
		return c.JSON(http.StatusNotFound, "Invalid password")
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

	err := c.Bind(&user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid data")
	}

	db.Find(&user)
	if user.ID != 0 {
		return c.JSON(http.StatusBadRequest, "User already exists")
	}

	db.Create(&user)

	return c.JSON(http.StatusOK, "User created")
}

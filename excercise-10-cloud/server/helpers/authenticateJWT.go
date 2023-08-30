package helpers

import (
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"net/http"
	"server/models"
	"strings"
)

func AuthenticateJWT(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		tokenString := c.Request().Header.Get("Authorization")
		if tokenString == "" {
			return c.String(http.StatusUnauthorized, "Brak tokenu JWT")
		}

		tokenString = strings.Replace(tokenString, "Bearer ", "", 1)

		token, err := jwt.ParseWithClaims(tokenString, &models.CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
			return models.SecretKey, nil
		})

		if err != nil || !token.Valid {
			return c.String(http.StatusUnauthorized, "Nieprawidłowy token JWT")
		}

		claims := token.Claims.(*models.CustomClaims)
		c.Set("user", claims)
		return next(c)
	}
}

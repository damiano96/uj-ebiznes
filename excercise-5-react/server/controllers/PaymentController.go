package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/database"
	"server/models"
)

func MakePayment(c echo.Context) error {
	var db = database.GetDB()
	var payment models.Payment

	err := c.Bind(&payment)

	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid data")
	}

	db.Create(&payment)

	return c.JSON(200, "Payment successful")
}

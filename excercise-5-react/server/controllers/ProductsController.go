package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/database"
	"server/models"
)

func GetProducts(c echo.Context) error {
	var db = database.GetDB()
	var products []models.Product
	db.Preload("Category").Find(&products)
	return c.JSONPretty(http.StatusOK, products, "	")
}

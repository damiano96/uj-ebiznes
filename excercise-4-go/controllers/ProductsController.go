package controllers

import (
	"excercise-4-go/database"
	"excercise-4-go/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func GetProducts(c echo.Context) error {
	var db = database.GetDB()
	var products []models.Product
	db.Preload("Category").Find(&products)
	return c.JSONPretty(http.StatusOK, products, "	")
}

func GetProduct(c echo.Context) error {
	var db = database.GetDB()
	var product models.Product
	var id = c.Param("id")

	db.First(&product, id)

	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
	var db = database.GetDB()
	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		panic(err)
	}
	db.Create(&product)

	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	var db = database.GetDB()
	var product models.Product
	var id = c.Param("id")

	db.First(&product, id)
	db.Delete(&product)

	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	return c.JSON(http.StatusOK, product)
}

func UpdateProduct(c echo.Context) error {
	var db = database.GetDB()
	product := new(models.Product)

	if err := c.Bind(product); err != nil {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	db.Save(&product)

	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	return c.JSON(http.StatusOK, product)
}

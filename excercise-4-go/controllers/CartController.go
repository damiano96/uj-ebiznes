package controllers

import (
	"excercise-4-go/database"
	"excercise-4-go/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func GetCart(c echo.Context) error {
	var db = database.GetDB()
	var carts []models.Cart

	db.Preload("Product").
		Preload("Product.Category").
		Find(&carts)

	return c.JSONPretty(http.StatusOK, carts, "  ")
}

func AddProductToCart(c echo.Context) error {
	var db = database.GetDB()
	var cart models.Cart
	var product models.Product

	err := c.Bind(&product)
	if err != nil {
		return err
	}

	db.First(&product, product.ID)

	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	db.Preload("Product").
		Preload("Product.Category").
		Find(&cart, "product_id = ?", product.ID)

	if cart.ID == 0 {
		cart = models.Cart{
			Product:  product,
			Quantity: 1,
		}
		db.Create(&cart)
	} else {
		cart.Quantity += 1
		db.Save(&cart)
	}

	return c.JSON(http.StatusOK, cart)
}

func RemoveProductFromCart(c echo.Context) error {
	var db = database.GetDB()
	var cart models.Cart
	var product models.Product

	db.First(&product, c.Param("productID"))

	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	db.Preload("Product").
		Preload("Product.Category").
		Find(&cart, "product_id = ?", product.ID)

	if cart.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found in cart")
	} else {
		cart.Quantity -= 1
		db.Save(&cart)
	}

	if cart.Quantity == 0 {
		db.Delete(&cart)
	}

	return c.JSON(http.StatusOK, cart)
}

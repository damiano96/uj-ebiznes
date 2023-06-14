package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/database"
	"server/models"
	"strconv"
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
	var productID, err = strconv.Atoi(c.Param("productID"))

	db.Find(&cart, "product_id = ?", productID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Product not found in cart")
	}

	if cart.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found in cart")
	}

	db.Delete(&cart)

	return c.JSON(http.StatusOK, "Product removed from cart")
}

func UpdateCartItem(c echo.Context) error {
	var db = database.GetDB()
	var cart models.Cart
	var cart2 models.Cart

	err := c.Bind(&cart)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Cart item not found")
	}

	db.Find(&cart2, "product_id = ?", cart.ProductID)

	if cart2.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found in cart")
	}

	if cart.Quantity == 0 {
		db.Delete(&cart2)
	} else {
		cart2.Quantity = cart.Quantity
		db.Save(&cart2)
	}

	return c.JSON(http.StatusOK, "Cart item updated")
}

func ClearCart(c echo.Context) error {
	var db = database.GetDB()
	var carts []models.Cart

	db.Find(&carts)

	if len(carts) == 0 {
		return c.JSON(http.StatusNotFound, "Cart is empty")
	}

	db.Delete(&carts)

	return c.JSON(http.StatusOK, "Cart cleared")
}

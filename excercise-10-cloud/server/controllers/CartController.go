package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/database"
	"server/models"
	"strconv"
)

const (
	ProductNotFoundInCart  = "Product not found in cart"
	ProductRemovedFromCart = "Product removed from cart"
	CartItemNotFound       = "Cart item not found"
	CartIsEmpty            = "Cart is empty"
	CartClear              = "Cart cleared"
	CartItemUpdated        = "Cart item updated"
)

const (
	productIdKey = "product_id = ?"
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
		Preload("Product.Category")

	db.Find(&cart, productIdKey, product.ID)

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

	db.Find(&cart, productIdKey, productID)

	if err != nil {
		return c.JSON(http.StatusNotFound, ProductNotFoundInCart)
	}

	if cart.ID == 0 {
		return c.JSON(http.StatusNotFound, ProductNotFoundInCart)
	}

	db.Delete(&cart)

	return c.JSON(http.StatusOK, ProductRemovedFromCart)
}

func UpdateCartItem(c echo.Context) error {
	var db = database.GetDB()
	var cart models.Cart
	var cart2 models.Cart

	err := c.Bind(&cart)
	if err != nil {
		return c.JSON(http.StatusNotFound, CartItemNotFound)
	}

	db.Find(&cart2, productIdKey, cart.Product.ID)

	if cart2.ID == 0 {
		return c.JSON(http.StatusNotFound, ProductNotFoundInCart)
	}

	if cart.Quantity == 0 {
		db.Delete(&cart2)
	} else {
		cart2.Quantity = cart.Quantity
		db.Save(&cart2)
	}

	return c.JSON(http.StatusOK, CartItemUpdated)
}

func ClearCart(c echo.Context) error {
	var db = database.GetDB()
	var carts []models.Cart

	db.Find(&carts)

	if len(carts) == 0 {
		return c.JSON(http.StatusNotFound, CartIsEmpty)
	}

	db.Delete(&carts)

	return c.JSON(http.StatusOK, CartClear)
}

package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/controllers"
)

func setProductsRoutes(e *echo.Echo) {
	e.GET("/products", controllers.GetProducts)
}

func setCartRoutes(e *echo.Echo) {
	e.GET("/cart", controllers.GetCart)
	e.POST("/cart", controllers.AddProductToCart)
	e.PUT("/cart", controllers.UpdateCartItem)
	e.DELETE("/cart/:productID", controllers.RemoveProductFromCart)
	e.DELETE("/cart", controllers.ClearCart)
}

func setRoutes(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello API!")
	})

	setProductsRoutes(e)
	setCartRoutes(e)
}

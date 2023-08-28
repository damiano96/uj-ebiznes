package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/controllers"
	"server/helpers"
)

func setProductsRoutes(e *echo.Echo) {
	e.GET("/products", controllers.GetProducts, helpers.AuthenticateJWT)
}

func setCartRoutes(e *echo.Echo) {
	e.GET("/cart", controllers.GetCart, helpers.AuthenticateJWT)
	e.POST("/cart", controllers.AddProductToCart, helpers.AuthenticateJWT)
	e.PUT("/cart", controllers.UpdateCartItem, helpers.AuthenticateJWT)
	e.DELETE("/cart/:productID", controllers.RemoveProductFromCart, helpers.AuthenticateJWT)
	e.DELETE("/cart", controllers.ClearCart, helpers.AuthenticateJWT)
}

func setPaymentRoutes(e *echo.Echo) {
	e.POST("/payment", controllers.MakePayment, helpers.AuthenticateJWT)
}

func setLoginRoutes(e *echo.Echo) {
	e.GET("/oauth/login", controllers.GetOAuthLogin)
	e.GET("/oauth/callback", controllers.GetOAuthCallback)

	e.POST("/register", controllers.RegisterUser)
	e.POST("/login", controllers.LoginUser)
}

func setRoutes(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello API!")
	})

	setProductsRoutes(e)
	setCartRoutes(e)
	setPaymentRoutes(e)
	setLoginRoutes(e)

}

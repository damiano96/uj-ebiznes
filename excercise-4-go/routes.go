package main

import (
	"excercise-4-go/controllers"
	"github.com/labstack/echo/v4"
	"net/http"
)

func setProductsRoutes(e *echo.Echo) {
	e.GET("/products", controllers.GetProducts)
	e.GET("/products/:id", controllers.GetProduct)
	e.POST("/products", controllers.CreateProduct)
	e.DELETE("/products/:id", controllers.DeleteProduct)
	e.PUT("/products/:id", controllers.UpdateProduct)
}

func setCategoriesRoutes(e *echo.Echo) {
	e.GET("/categories", controllers.GetCategories)
	e.GET("/categories/:id", controllers.GetCategory)
	e.POST("/categories", controllers.CreateCategory)
	e.DELETE("/categories/:id", controllers.DeleteCategory)
	e.PUT("/categories/:id", controllers.UpdateCategory)
}

func setCartRoutes(e *echo.Echo) {
	e.GET("/cart", controllers.GetCart)
	e.POST("/cart", controllers.AddProductToCart)
	e.DELETE("/cart/:productID", controllers.RemoveProductFromCart)
}

func setRoutes(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello API!")
	})

	setProductsRoutes(e)
	setCategoriesRoutes(e)
	setCartRoutes(e)
}

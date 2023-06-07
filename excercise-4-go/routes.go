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

//func setCartRoutes(e *echo.Echo) {
//	e.GET("/cart", func(c echo.Context) error {
//		return c.JSON(http.StatusOK, controllers.GetCart())
//	})
//
//	e.POST("/cart", func(c echo.Context) error {
//		return c.JSON(http.StatusOK, controllers.CreateCartItem(c))
//	})
//
//	e.DELETE("/cart/:id", func(c echo.Context) error {
//		return c.JSON(http.StatusOK, controllers.DeleteCartItem(c.Param("id")))
//	})
//
//	e.PUT("/cart/:id", func(c echo.Context) error {
//		return c.JSON(http.StatusOK, controllers.UpdateCartItem(c))
//	})
//}

func setRoutes(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello API!")
	})

	setProductsRoutes(e)
	setCategoriesRoutes(e)
	//setCartRoutes(e)
}

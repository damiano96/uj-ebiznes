package main

import (
	"excercise-4-go/database"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func createServer() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	setRoutes(e)
	e.Logger.Fatal(e.Start(":1323"))
}

func main() {
	database.MigrateDatabase()
	createServer()
}

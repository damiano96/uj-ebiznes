package main

import (
	"excercise-4-go/database"
	"github.com/labstack/echo/v4"
)

func createServer() {
	e := echo.New()
	setRoutes(e)
	e.Logger.Fatal(e.Start(":1323"))
}

func main() {
	database.MigrateDatabase()
	createServer()
}

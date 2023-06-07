package controllers

import (
	"excercise-4-go/database"
	"excercise-4-go/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func GetCategories(c echo.Context) error {
	var db = database.GetDB()
	var categories []models.Category
	db.Find(&categories)

	return c.JSONPretty(http.StatusOK, categories, "  ")
}

func GetCategory(c echo.Context) error {
	var db = database.GetDB()
	var category models.Category
	var id = c.Param("id")

	db.First(&category, id)

	return c.JSON(http.StatusOK, category)
}

func CreateCategory(c echo.Context) error {
	var db = database.GetDB()
	category := new(models.Category)
	if err := c.Bind(category); err != nil {
		panic(err)
	}

	db.Create(&category)

	return c.JSON(http.StatusOK, *category)
}

func DeleteCategory(c echo.Context) error {
	var db = database.GetDB()
	var category models.Category
	var id = c.Param("id")

	db.First(&category, id)
	db.Delete(&category)

	return c.JSON(http.StatusOK, category)
}

func UpdateCategory(c echo.Context) error {
	var db = database.GetDB()
	category := new(models.Category)
	if err := c.Bind(category); err != nil {
		panic(err)
	}
	db.Save(&category)

	return c.JSON(http.StatusOK, *category)
}

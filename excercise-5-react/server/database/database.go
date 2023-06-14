package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"server/models"
)

func GetDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	return db
}

func MigrateDatabase() *gorm.DB {
	var db = GetDB()

	if db.Migrator().HasTable("products") == false {
		db.AutoMigrate(&models.Category{}, &models.Product{}, &models.Cart{})
		db.Exec("INSERT INTO categories (name) VALUES ('Notebook'), ('Smartphone'), ('Tablet'), ('TV'), ('Camera')")
		db.Exec("INSERT INTO products (name, price, category_id) VALUES ('MacBook Pro 13', 1000, 1), ('MacBook Pro 15', 1500, 1), ('MacBook Air', 800, 1), ('iPhone 6', 500, 2), ('iPhone 7', 700, 2), ('iPhone 8', 800, 2), ('iPad', 400, 3), ('iPad Pro', 600, 3), ('iPad Air', 500, 3), ('Samsung Galaxy S8', 600, 2), ('Samsung Galaxy S9', 700, 2), ('Samsung Galaxy S10', 800, 2), ('Samsung Galaxy Tab', 400, 3), ('Samsung Galaxy Tab Pro', 600, 3), ('Samsung Galaxy Tab Air', 500, 3), ('Samsung TV 32', 400, 4), ('Samsung TV 42', 600, 4), ('Samsung TV 52', 700, 4), ('Samsung TV 62', 800, 4), ('Samsung TV 72', 900, 4), ('Canon EOS 1000D', 400, 5), ('Canon EOS 2000D', 600, 5), ('Canon EOS 3000D', 700, 5), ('Canon EOS 4000D', 800, 5), ('Canon EOS 5000D', 900, 5), ('Nikon D3000', 400, 5), ('Nikon D5000', 600, 5), ('Nikon D7000', 700, 5), ('Nikon D9000', 800, 5), ('Nikon D10000', 900, 5);")
	}

	return db
}

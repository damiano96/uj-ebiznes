package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	ID         uint `gorm:"primaryKey"`
	Name       string
	Price      int
	CategoryID int
	Category   Category `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

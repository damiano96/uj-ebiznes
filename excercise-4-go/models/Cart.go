package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	ID        uint `gorm:"primaryKey;autoIncrement"`
	ProductID uint
	Product   Product `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Quantity  int
}

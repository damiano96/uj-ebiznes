package models

import "gorm.io/gorm"

type Payment struct {
	gorm.Model
	ID               uint `gorm:"primaryKey;autoIncrement"`
	Price            int
	CreditCardNumber int
}

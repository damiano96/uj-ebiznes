package models

type Cart struct {
	ID         uint `gorm:"primaryKey"`
	ProductID  int
	Product    Product `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Quantity   int
	TotalPrice int
}

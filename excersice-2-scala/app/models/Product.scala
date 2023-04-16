package models

import play.api.libs.json.{Json, OFormat}

case class Product(var id: Long, var name: String, var description: String, var price: Double, var category: Category)

object Product {
  implicit val productJson: OFormat[Product] = Json.format[Product]
}
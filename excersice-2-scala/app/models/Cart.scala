package models

import play.api.libs.json.{Json, OFormat}

case class Cart(var id: Long, product: Product, var quantity: Int)

object Cart {
  implicit val cartJson: OFormat[Cart] = Json.format[Cart]
}
package models

import play.api.libs.json.{Json, OFormat}

case class Category(var id: Long, name: String)

object Category {
  implicit val categoryJson: OFormat[Category] = Json.format[Category]
}
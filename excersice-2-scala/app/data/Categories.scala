package data

import models.Category

import scala.collection.mutable
import scala.collection.mutable.ListBuffer

case object Categories {
  var categoriesList: mutable.ListBuffer[Category] = {
    ListBuffer(
      Category(1, "food"),
      Category(2, "drink"),
      Category(3, "snack")
    )
  }
}

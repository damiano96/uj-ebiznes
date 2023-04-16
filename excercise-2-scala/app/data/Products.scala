package data

import models.Product

import scala.collection.mutable
import scala.collection.mutable.ListBuffer

case object Products {
  var productsList: mutable.ListBuffer[Product] = {
    ListBuffer(
      Product(1, "Apple", "A red apple", 16.0, Categories.categoriesList(0)),
      Product(2, "Orange", "A orange", 61.0, Categories.categoriesList(0)),
      Product(3, "Milk", "A milk", 12.0, Categories.categoriesList(1)),
      Product(4, "Coke", "A coke", 31.0, Categories.categoriesList(1)),
      Product(5, "Chips", "A chips", 14.0, Categories.categoriesList(2)),
      Product(6, "Chocolate", "A chocolate", 31.0, Categories.categoriesList(2))
    )
  }
}

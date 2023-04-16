package data

import models.Cart

import scala.collection.mutable
import scala.collection.mutable.ListBuffer

case object CartProducts {
  var cart: mutable.ListBuffer[Cart] = {ListBuffer()}
}

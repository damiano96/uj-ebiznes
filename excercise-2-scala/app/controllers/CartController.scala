package controllers

import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}

import javax.inject.Inject

class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def getCart: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val cart = data.CartProducts.cart
    Ok(Json.toJson(cart))
  }

  def addProductToCart: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val body = request.body.asJson.get
    val productId = (body \ "id").as[Long]
    val product = data.Products.productsList.find(_.id == productId)
    product match {
      case Some(p) =>
        val cartProduct = data.CartProducts.cart.find(_.product.id == productId)
        cartProduct match {
          case Some(cp) =>
            cp.quantity += 1
            Ok(Json.toJson(cp))
          case None =>
            val lastIndex = if (data.CartProducts.cart.isEmpty) 0 else data.CartProducts.cart.last.id
            val newCartProduct = models.Cart(lastIndex + 1, p, 1)
            data.CartProducts.cart += newCartProduct
            Ok(Json.toJson(newCartProduct))
        }
      case None => NotFound
    }
  }

  def updateProductInCart: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val body = request.body.asJson.get
    val productId = (body \ "id").as[Long]
    val quantity = (body \ "quantity").as[Int]
    val product = data.Products.productsList.find(_.id == productId)
    product match {
      case Some(p) =>
        val cartProduct = data.CartProducts.cart.find(_.product.id == productId)
        cartProduct match {
          case Some(cp) =>
            if (quantity == 0) {
              data.CartProducts.cart.remove(data.CartProducts.cart.indexOf(cp))
              Ok
            } else {
              cp.quantity = quantity
              Ok(Json.toJson(cp))
            }
          case None => NotFound
        }
      case None => NotFound
    }
  }


  def clearCart: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    data.CartProducts.cart.clear()
    Ok
  }


}
package controllers

import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}
import play.api.libs.json._

import javax.inject.Inject

class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def getProducts: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val products = data.Products.productsList
    Ok(Json.toJson(products))
  }

  def getProduct(id: Long): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val product = data.Products.productsList.find(_.id == id)
    product match {
      case Some(p) => Ok(Json.toJson(p))
      case None => NotFound
    }
  }

  def createProduct: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val body = request.body.asJson.get
    val product = body.as[models.Product]

    val lastIndex = data.Products.productsList.last.id
    product.id = lastIndex + 1

    data.Products.productsList += product
    Ok(Json.toJson(product))
  }

  def deleteProduct(id: Long): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val productIndex = data.Products.productsList.indexWhere(_.id == id)
    if (productIndex == -1) {
      NotFound
    } else {
      data.Products.productsList.remove(productIndex)
      Ok
    }
  }

  def updateProduct(id: Long): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val body = request.body.asJson.get
    val product = body.as[models.Product]
    val productIndex = data.Products.productsList.indexWhere(_.id == id)
    if (productIndex == -1) {
      NotFound
    } else {
      data.Products.productsList(productIndex) = product
      Ok(Json.toJson(product))
    }
  }
}
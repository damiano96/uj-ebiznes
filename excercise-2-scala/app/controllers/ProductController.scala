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

    val name = (body \ "name").as[String]
    val description = (body \ "description").as[String]
    val price = (body \ "price").as[Double]
    val categoryName = (body \ "category").as[String]

    val productIndex = data.Products.productsList.indexWhere(_.id == id)
    if (productIndex == -1) {
      NotFound
    } else {
      val category = data.Categories.categoriesList.find(_.name == categoryName) match {
        case Some(c) => c
        case None =>
          val lastIndex = data.Categories.categoriesList.last.id
          val newCategory = models.Category(lastIndex + 1, categoryName)
          data.Categories.categoriesList += newCategory
          newCategory
      }
      val product = new models.Product(id, name, description, price, category)
      data.Products.productsList(productIndex) = product
      Ok(Json.toJson(product))
    }
  }

  def createProduct: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val body = request.body.asJson.get

    val id = if (data.Products.productsList.isEmpty) 1 else data.Products.productsList.last.id + 1
    val name = (body \ "name").as[String]
    val description = (body \ "description").as[String]
    val price = (body \ "price").as[Double]
    val categoryName = (body \ "category").as[String]

    val category = data.Categories.categoriesList.find(_.name == categoryName) match {
      case Some(c) => c
      case None =>
        val lastIndex = data.Categories.categoriesList.last.id
        val newCategory = models.Category(lastIndex + 1, categoryName)
        data.Categories.categoriesList += newCategory
        newCategory
    }

    val product = new models.Product(id, name, description, price, category)

    val productIndex = data.Products.productsList.indexWhere(_.name == product.name)
    if (productIndex == -1) {
      val lastIndex = data.Products.productsList.last.id
      product.id = lastIndex + 1
      data.Products.productsList += product
      Ok(Json.toJson(product))
    } else {
      BadRequest
    }
  }

}
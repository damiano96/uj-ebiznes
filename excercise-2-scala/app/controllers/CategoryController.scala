package controllers

import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}

import javax.inject.Inject

class CategoryController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def getCategories: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val categories = data.Categories.categoriesList
    Ok(Json.toJson(categories))
  }

  def getCategory(id: Long): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val category = data.Categories.categoriesList.find(_.id == id)
    category match {
      case Some(c) => Ok(Json.toJson(c))
      case None => NotFound
    }
  }

  def createCategory: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val body = request.body.asJson.get

    val id = data.Categories.categoriesList.lastOption match {
      case Some(c) => c.id + 1
      case None => 1
    }
    val name = (body \ "name").as[String]

    val category = new models.Category(id, name)

    val categoryIndex = data.Categories.categoriesList.indexWhere(_.name == category.name)
    if (categoryIndex == -1) {
      data.Categories.categoriesList += category
      Ok(Json.toJson(category))
    } else {
      BadRequest
    }
  }

  def updateCategory(id: Long): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val body = request.body.asJson.get
    val category = body.as[models.Category]
    val categoryIndex = data.Categories.categoriesList.indexWhere(_.id == id)
    if (categoryIndex == -1) {
      NotFound
    } else {
      data.Categories.categoriesList(categoryIndex) = category
      Ok(Json.toJson(category))
    }
  }

  def deleteCategory(name: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val categoryIndex = data.Categories.categoriesList.indexWhere(_.name == name)
    if (categoryIndex == -1) {
      NotFound
    } else {
      data.Categories.categoriesList.remove(categoryIndex)
      data.Products.productsList = data.Products.productsList.filterNot(_.category.name == name)
      Ok
    }
  }
}
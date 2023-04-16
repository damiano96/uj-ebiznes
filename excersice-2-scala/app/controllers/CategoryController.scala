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
    val category = body.as[models.Category]
    val categoryIndex = data.Categories.categoriesList.indexWhere(_.name == category.name)
    if (categoryIndex == -1) {
      val lastIndex = data.Categories.categoriesList.last.id
      category.id = lastIndex + 1
      data.Categories.categoriesList += category
      Ok(Json.toJson(category))
    } else {
      BadRequest
    }
  }

  def deleteCategory(id: Long): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val categoryIndex = data.Categories.categoriesList.indexWhere(_.id == id)
    if (categoryIndex == -1) {
      NotFound
    } else {
      data.Categories.categoriesList.remove(categoryIndex)
      Ok
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
}
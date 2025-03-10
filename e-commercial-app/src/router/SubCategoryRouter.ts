import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleware";
import { Utils } from "../utils/Utils";
import { SubCategoryController } from "../controller/subCategoryCotroller";
import { SubCategoryValidators } from "../validator/SubCategoryValidators";

class SubCategoryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/getSubCategories",
      GlobalMiddleWare.auth,
      SubCategoryController.getSubCategories,
    );
    this.router.get(
      "/getSubCategories/:categoryId",
      GlobalMiddleWare.auth,
      SubCategoryController.getCategoriesByCategory,
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("subCategoryImages"),
      SubCategoryValidators.addSubCategory(),
      GlobalMiddleWare.checkError,
      SubCategoryController.addSubCategory,
    );
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}
export default new SubCategoryRouter().router;

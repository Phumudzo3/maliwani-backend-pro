import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleware";
import { CategoryController } from "../controller/CategoryController";
import { CategoryValidators } from "../validator/CategoriesValidators";
import { Utils } from "../utils/Utils";

class CategoryRouter {
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
      "/getCategories",
      GlobalMiddleWare.auth,
      CategoryController.getCategories,
    );
   
  }
  

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("categoryImages"),
      CategoryValidators.addCategory(),
      GlobalMiddleWare.checkError,
      CategoryController.addCategory,
    );
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}
export default new CategoryRouter().router;

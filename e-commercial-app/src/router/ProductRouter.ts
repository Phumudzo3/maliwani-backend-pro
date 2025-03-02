import { Router } from "express";

import { GlobalMiddleWare } from "../middlewares/GlobalMiddleware";
import { ProductController } from "../controller/ProductContoller";
import { Utils } from "../utils/Utils";
import { ProductValidators } from "../validator/ProductValidators";


class ProductRouter {
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
      "/getByCategory",
      ProductValidators.getProductByCategory(),
      GlobalMiddleWare.checkError,
      GlobalMiddleWare.auth,
      ProductController.getProductByCategory,
    );
   }

  postRoutes() {
    this.router.post(
      "/create",
       GlobalMiddleWare.auth,
      GlobalMiddleWare.adminStoreRole,
      new Utils().multer.array("productImages"),
     ProductValidators.addItem(),
     GlobalMiddleWare.checkError,
     ProductController.addItem,
    );
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}
export default new ProductRouter().router;

import { Router } from "express";

import { GlobalMiddleWare } from "../middlewares/GlobalMiddleware";
import { CartController } from "../controller/CartController";
import { CartValidators } from "../validator/CartValidators";


class OrderRouter {
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
      "/getCart",
      GlobalMiddleWare.auth,
      CartController.getUserCart,
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      CartValidators.addToCart(),
   GlobalMiddleWare.checkError,
      CartController.addToCart,
    );
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}

export default new OrderRouter().router;

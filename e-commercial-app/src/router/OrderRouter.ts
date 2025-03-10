import { Router } from "express";

import { GlobalMiddleWare } from "../middlewares/GlobalMiddleware";
import { OrderController } from "../controller/OrderController";
import { OrderValidators } from "../validator/OrderValidators";

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
      "/userOrders",
      GlobalMiddleWare.auth,
      OrderController.getUserOrders,
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      OrderValidators.placeOrder(),
      GlobalMiddleWare.checkError,
      OrderController.placeOrder,
    );
    this.router.post(
      "/stripeCheckout",
      OrderController.stripeCheckout,
    );
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}

export default new OrderRouter().router;

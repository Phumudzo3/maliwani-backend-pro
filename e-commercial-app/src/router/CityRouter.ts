import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleware";
import { CityController } from "../controller/CityController";
import { CityValidators } from "../validator/CityValidators";

class CityRouter {
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
    this.router.get("/cities", CityController.getCities);
  }

  postRoutes() {
    this.router.post(
      "/create",
      CityValidators.addCity(),
      GlobalMiddleWare.checkError,
      CityController.addCity,
    );
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}
export default new CityRouter().router;

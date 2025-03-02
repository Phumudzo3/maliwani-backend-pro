import { Router } from "express";

import { GlobalMiddleWare } from "../middlewares/GlobalMiddleware";
import { AddressController } from "../controller/AddressController";
import { AddressValidators } from "../validator/AddressValidators";

class AddressRouter {
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
      "/useraddresses",
      GlobalMiddleWare.auth,
      AddressController.getAddresses,
    );
    // this.router.get('/:id',GlobalMiddleWare.auth,AddressController.getAddressById);
    this.router.get(
      "/checkaddress",
      GlobalMiddleWare.auth,
      AddressValidators.checkAddress(),
      GlobalMiddleWare.checkError,
      AddressController.checkAddresses,
    );
    this.router.get(
      "/getlimitedaddresses",
      GlobalMiddleWare.auth,
      AddressValidators.getLimitedAddresses(),
      GlobalMiddleWare.checkError,
      AddressController.getLimitedAddresses,
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      AddressValidators.addAddress(),
      GlobalMiddleWare.checkError,
      AddressController.addAddress,
    );
  }
  patchRoutes() {
    //this.router.patch('/edit/:id',GlobalMiddleWare.auth,AddressValidators.editAddress(),GlobalMiddleWare.checkError,AddressController.editAddress);
  }
  putRoutes() {
    this.router.put(
      "/edit/:id",
      GlobalMiddleWare.auth,
      AddressValidators.editAddress(),
      GlobalMiddleWare.checkError,
      AddressController.editAddress,
    );
  }
  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleWare.auth,
      AddressController.deleteAddress,
    );
  }
}

export default new AddressRouter().router;

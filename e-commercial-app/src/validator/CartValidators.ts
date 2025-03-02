import { body } from "express-validator";

export class CartValidators {
  static addToCart() {
    return [
     
      body("products", "products items is required").isString(),
      body("status", "Order status is required").isString(),
      body("total", "Cart total is required").isNumeric(),
    //   body("grandTotal", "grand total is required").isNumeric(),
    //   body("deliveryCharge", "delivery charge is required").isNumeric(),
    ];
  }
}

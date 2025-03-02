import { body } from "express-validator";
export class SubCategoryValidators {
  static addSubCategory() {
    return [
        body("category_id", "category is required").isString(),
      body("name", "Name is required").isString(),
      body("status", "Status is required").isString(),
    ];
  }
}

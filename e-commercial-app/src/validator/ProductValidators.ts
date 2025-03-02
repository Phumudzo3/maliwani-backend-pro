import { body, query } from "express-validator";
import Store from "../models/Store";
import Category from "../models/Category";


export class ProductValidators {
  static addItem() {
    return [
      // body('itemImages', 'item images is required').custom((cover, { req }) => {
      //   if (req.files) {
      //     return true;
      //   } else {
      //     throw 'file not uploaded';
      //   }
      // }),
      body("product_name", "Product_name required").isString(),
      body("store_id", "store id is required")
        .isString()
        .custom((store_id, { req }) => {
          return Store.findById(store_id)
            .then((store) => {
              if (store) {
                if (req.user.type == "admin" || store.user_id == req.user.aud)
                  //
                  return true;
                throw "You are not an Authorized user for this store";
              } else {
                throw "store doesnt  Exists";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("category_id", "Category_id is required")
        .isString()
        .custom((category_id, { req }) => {
          console.log("Category ID:", category_id);
          console.log("Store ID:", req.body.store_id);
          return Category.findOne({
            _id: category_id,
            // store_id: req.body.store_id,
          })
            .then((category) => {
              if (category) {
                return true;
              } else {
                throw "Category doesn/t  Exists";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("price", "Price is required").isString(),
      body("status", "Status is required").isBoolean(),
    ];
  }
  static getProductByCategory() {
    return [
query('category_id', 'category id is required')
        .isString()
        
    ];
  }
}

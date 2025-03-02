import { body, query } from "express-validator";
import User from "../models/User";

export class StoreValidators {
  static addStore() {
    return [
      body("name", "Owner Name is required").isString(),
      body("email", " Email is required")
        .isEmail()
        .custom((email, { req }) => {
          //if(req.user.email==email) throw ("please provide a new unique email to update the user profile");
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                //throw('User does not exist');
                throw "user already exist,please provide unique email id";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("storeImages", "store Image is required").custom(
        (storeImage, { req }) => {
          if (req.file) {
            return true;
          } else {
            //file not upload
            throw "file not uploaded";
          }
        },
      ),
      body("phone", " Phone is required").isString()
      .custom((phone, { req }) => {
        //if(req.user.email==email) throw ("please provide a new unique email to update the user profile");
        return User.findOne({
         phone:phone,
         type:'store'
        })
          .then((user) => {
            if (user) {
              //throw('User does not exist');
              throw "user already exist,please provide unique email id";
            } else {
              return true;
            }
          })
          .catch((e) => {
            throw new Error(e);
          });
      }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 25 }),
      body("store_name", "Restaurant Name is required").isString(),

      body("status", "Status is required").isString(),
      body("address", "Address is required").isString(),
      body("location", "Location is required").isString(),
      body("city_id", "City id is required").isString(),
    ];
  }

  static searchStores() {
    return [query("name", " search query is required").isString()];
  }
}

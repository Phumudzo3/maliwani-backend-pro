import { body, query } from "express-validator";
import User from "../models/User";
export class UserValidators {
  static registerUserViaPhone() {
    return [
      query("phone", "Phone number is required")
        .isString()
        .custom((phone, { req }) => {
          return User.findOne({
            phone: phone,
            type: "user",
          })
            .then((user) => {
              if (user) {
                req.user = user;
                req.register = true;
                //throw('User already Exists');
              } else {
                req.user = null; // Explicitly set to null
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }
  static optLogin() {
    return [
      query("phone", "Phone number is required").isString(),
      query("otp", "PTP is required").isNumeric(),
    ];
  }
  static signup() {
    return [
      body("name", "Name is required").isString(),
      body("phone", "Phone number is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
            //  type:type
          })
            .then((user) => {
              if (user) {
                throw "User already Exists";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),

      body("phone", "Phone is required").isString(),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 25 })
        .withMessage("password must be between 8 -20 characters"),
      body("type", "user role type is required").isString(),
      body("status", "status role type is required").isString(),
    ];
  }
  static verifyUserEmailToken() {
    return [
      body("verification_token", "verification token is required").isString(),
    ];
  }

  static login() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                if (user.type == "user" || user.type == "admin" || user.type == "store") {
                  req.user = user;
                  console.log("you are logged in");
                  return true;
                } else {
                  //you are not authorized user
                  throw "You are not an authorized user";
                }
              } else {
                //you are not authorized user
                throw "You are not an authorized user";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("password", "Password is required").isAlphanumeric(),
    ];
  }
  static checkResetPasowrdEmail() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                return true;
              } else {
                throw "User does not exist";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }
  static verifyResetPasswordToken() {
    return [
      query("email", "Email is required").isEmail(),
      query("reset_password_token", "Reset password token is required")
        .isNumeric()
        .custom((reset_password_token, { req }) => {
          return User.findOne({
            email: req.email,
            reset_password_token: reset_password_token,
            reset_password_token_time: { $gt: Date.now() },
          })
            .then((user) => {
              if (user) {
                return true;
              } else {
                //throw('User does not exist');
                throw "Reset password token doesn\t exit,please regenerate a new token";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }
  static resetpassword() {
    return [
      body("email, email is required")
        .isEmail()
        .custom((email, { req }) => {
          User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                req.user = user;
                return true;
              } else {
                //throw('User does not exist');
                throw "No user is found";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
          body("new_password", "new password is required").isAlphanumeric(),
            body("otp", "Reset password token is required")
              .isNumeric()
              .custom((reset_password_token, { req }) => {
                if (req.user.reset_password_token == reset_password_token) {
                  return true;
                } else {
                  req.errorStatus = 422;
                  throw "Reset token is invalid,Please try again";
                }
              });
        }),
    ];
  }
  static verifyPhoneNumber() {
    return [body("phone", "Phone is required").isString()];
  }
  static verifyUserProfile() {
    return [
      body("phone", "Phone is required").isString(),
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
      body("password", "Password is required").isAlphanumeric(),
    ];
  }
  static verifyCustomerProfile() {
    return [
      body("name", "name is required").isString(),
      body("email", " Email is required")
        .isEmail()
        .custom((email, { req }) => {
          //if(req.user.email==email) throw ("please provide a new unique email to update the user profile");
          return User.findOne({
            email: email,
            type: "user",
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
    ];
  }
  // static checkRefreshToken(){
  //   return[
  //     body('refreshToken','refresh token is required').isString()
  //     .custom((refreshToken,{req})=>{
  // if(refreshToken){
  //   return true;
  // }else{
  //   req.errorStatus=403;
  //   //throw new error( access is forbidden)
  //   throw ( "access is forbidden");
  // }
  //     })
  //   ]
  // }
  static userProfilePic() {
    return [
      body("profileImages", "profile Image is required").custom(
        (profileImage, { req }) => {
          if (req.file) {
            return true;
          } else {
            //file not upload
            throw "file not uploaded";
          }
        },
      ),
    ];
  }
}

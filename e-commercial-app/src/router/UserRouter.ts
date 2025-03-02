import { Router } from "express";
//import path = require("path");
import { userController } from "../controller/userController";
import { UserValidators } from "../validator/UserValidators";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleware";
import { Utils } from "../utils/Utils";

class UserRouter {
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
      "/otp_login",
      UserValidators.optLogin(),
      GlobalMiddleWare.checkError,
      userController.otpLogin,
    );
    this.router.get(
      "/registerUserViaPhone",
      UserValidators.registerUserViaPhone(),
      GlobalMiddleWare.checkError,
      userController.registerUserViaPhone,
    );
    this.router.get(
      "/send/verification/email",
      GlobalMiddleWare.auth,
      userController.resendVerificationEmail,
    );
    this.router.get(
      "/login",
      UserValidators.login(),
      GlobalMiddleWare.checkError,
      userController.login,
    );
    this.router.get(
      "/send/reset/password/token",
      UserValidators.checkResetPasowrdEmail(),
      GlobalMiddleWare.checkError,
      userController.sendResetPasswordOTP,
    );
    this.router.get(
      "/verify/resetPasswordToken",
      UserValidators.verifyResetPasswordToken(),
      GlobalMiddleWare.checkError,
      userController.verifyResetPasswordToken,
    );
    this.router.get("/profile", GlobalMiddleWare.auth, userController.profile);
    this.router.get("/export", GlobalMiddleWare.auth, userController. exportUsersToExcel);
  }

  postRoutes() {
    this.router.post(
      "/signup",
      UserValidators.signup(),
      GlobalMiddleWare.checkError,
      userController.signup,
    );
    this.router.post(
      "/login",
      UserValidators.login(),
      GlobalMiddleWare.checkError,
      userController.login,
    );
    this.router.post(
      "/refreshtoken",
      GlobalMiddleWare.checkError,
      GlobalMiddleWare.decodeRefreshToken,
      userController.getNewTokens,
    );
    this.router.post("/logout", GlobalMiddleWare.auth, userController.logout);
  }
  patchRoutes() {
    this.router.patch(
      "/reset/password",
      UserValidators.resetpassword(),
      GlobalMiddleWare.checkError,
      userController.resetpassword,
    );
    this.router.patch(
      "/verify/emailToken",
      GlobalMiddleWare.auth,
      UserValidators.verifyUserEmailToken(),
      GlobalMiddleWare.checkError,
      userController.verifyUserEmailToken,
    );
    this.router.patch(
      "/update/phone",
      GlobalMiddleWare.auth,
      UserValidators.verifyPhoneNumber(),
      GlobalMiddleWare.checkError,
      userController.updatePhoneNumber,
    );
    this.router.patch(
      "/update/profile",
      GlobalMiddleWare.auth,
      UserValidators.verifyUserProfile(),
      GlobalMiddleWare.checkError,
      userController.updateUserProfile,
    );
    this.router.patch(
      "/update/customer_profile",
      GlobalMiddleWare.auth,
      UserValidators.verifyCustomerProfile(),
      GlobalMiddleWare.checkError,
      userController.updateCustomerProfile,
    );
  }
  putRoutes() {}
  deleteRoutes() {
    this.router.put(
      "/update/profilepic",
      GlobalMiddleWare.auth,
      new Utils().multer.single("profileImages"),
      UserValidators.userProfilePic(),
      GlobalMiddleWare.checkError,
      userController.updateUserProfilePic,
    );
  }
}
export default new UserRouter().router;

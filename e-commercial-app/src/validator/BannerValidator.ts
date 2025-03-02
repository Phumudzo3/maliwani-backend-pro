import { body } from "express-validator";

export class BannerValidators {
  static addBanner() {
    return [
      body("bannerImages", "Banner images is required").custom(
        (banner, { req }) => {
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

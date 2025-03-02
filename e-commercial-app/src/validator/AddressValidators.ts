import { body, query } from "express-validator";

export class AddressValidators {
  static addAddress() {
    return [
      body("title", "title is required").isString(),
      body("landmark", "landmark is required").isString(),
      body("address", "address is required").isString(),
      body("house", "house is required").isString(),
      body("lat", "lat is required").isNumeric(),
      body("long", "long is required").isNumeric(),
    ];
  }
  static getNearByRestaurants() {
    return [
      query("long", " Longitude is required").isNumeric(),
      query("lat", "Latitude is required").isNumeric(),
      query("radius", " Radius is required").isNumeric(),
    ];
  }
  static editAddress() {
    return [
      body("title", "title is required").isString(),
      body("landmark", "landmark is required").isString(),
      body("address", "address is required").isString(),
      body("house", "house is required").isString(),
      body("lat", "lat is required").isNumeric(),
      body("long", "long is required").isNumeric(),
    ];
  }
  static checkAddress() {
    return [
      query("lat", "lat is required").isNumeric(),
      query("long", "long is required").isNumeric(),
    ];
  }
  static getLimitedAddresses() {
    return [query("limit", "address limit is required").isNumeric()];
  }
}

import { body } from "express-validator";

export class CityValidators {
  static addCity() {
    return [
      body("name", "City Name is required").isString(),
      body("long", "Longitude is required").isNumeric(),
      body("lat", "Latitude  is required").isNumeric(),
      body("status", "Status is required").isString(),
    ];
  }
}

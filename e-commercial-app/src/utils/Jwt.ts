import * as jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../enviroments/environment";
import * as Crypto from "crypto";
import { Redis } from "./Redis";

export class Jwt {
  static jwtSign(payload: any, userId: string, expires_In: string | number = "1h") {
    try {
      // Cast expires_In to the expected type for jwt.sign
      return jwt.sign(payload, getEnvironmentVariables().jwt_secret_key, {
        expiresIn: expires_In as jwt.SignOptions['expiresIn'],
        audience: userId.toString(),
        issuer: "p3.com",
      });
    } catch (error) {
      console.error("Error generating token:", error);
      throw error;
    }
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getEnvironmentVariables().jwt_secret_key,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error("User is not authorized."));
          else resolve(decoded);
        }
      );
    });
  }

  static async jwtSignRefreshToken(
    payload: any,
    userId: string,
    expires_In: string | number = "1y",
    redis_ex: number = 20 // Redis expiry in seconds (adjust as needed)
  ) {
    try {
      // Cast expires_In to the expected type for jwt.sign
      const refreshToken = jwt.sign(
        payload,
        getEnvironmentVariables().jwt_refresh_secret_key,
        {
          expiresIn: expires_In as jwt.SignOptions['expiresIn'],
          audience: userId.toString(),
          issuer: "p3.com",
        }
      );

      // Store refresh token in Redis
      await Redis.setValue(userId.toString(), refreshToken, redis_ex);
      return refreshToken;
    } catch (error) {
      console.error("Error generating refresh token:", error);
      throw error;
    }
  }

  static jwtVerifyRefreshToken(refreshToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        getEnvironmentVariables().jwt_refresh_secret_key,
        async (err, decoded) => {
          if (err) return reject(err);
          if (!decoded) return reject(new Error("User is not authorized."));

          try {
            // Match refresh token from Redis
            const user: any = decoded;
            const storedToken = await Redis.getValue(user.aud);
            if (storedToken === refreshToken) {
              resolve(decoded);
            } else {
              reject(new Error("Your session has expired, please login again!"));
            }
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }

  private static gen_secret_key() {
    const DEV_access_token_secret_key = Crypto.randomBytes(32).toString("hex");
    const DEV_refresh_access_token_secret_key = Crypto.randomBytes(32).toString("hex");

    const PROD_access_token_secret_key = Crypto.randomBytes(32).toString("hex");
    const PROD_refresh_access_token_secret_key = Crypto.randomBytes(32).toString("hex");

    console.table({
      DEV_access_token_secret_key,
      DEV_refresh_access_token_secret_key,
      PROD_access_token_secret_key,
      PROD_refresh_access_token_secret_key,
    });
  }
}

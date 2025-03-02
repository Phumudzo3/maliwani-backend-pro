"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jwt = require("jsonwebtoken");
const environment_1 = require("../enviroments/environment");
const Crypto = require("crypto");
const Redis_1 = require("./Redis");
class Jwt {
    static jwtSign(payload, userId, expires_In = "1h") {
        try {
            // Cast expires_In to the expected type for jwt.sign
            return jwt.sign(payload, (0, environment_1.getEnvironmentVariables)().jwt_secret_key, {
                expiresIn: expires_In,
                audience: userId.toString(),
                issuer: "p3.com",
            });
        }
        catch (error) {
            console.error("Error generating token:", error);
            throw error;
        }
    }
    static jwtVerify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, (0, environment_1.getEnvironmentVariables)().jwt_secret_key, (err, decoded) => {
                if (err)
                    reject(err);
                else if (!decoded)
                    reject(new Error("User is not authorized."));
                else
                    resolve(decoded);
            });
        });
    }
    static jwtSignRefreshToken(payload_1, userId_1) {
        return __awaiter(this, arguments, void 0, function* (payload, userId, expires_In = "1y", redis_ex = 20 // Redis expiry in seconds (adjust as needed)
        ) {
            try {
                // Cast expires_In to the expected type for jwt.sign
                const refreshToken = jwt.sign(payload, (0, environment_1.getEnvironmentVariables)().jwt_refresh_secret_key, {
                    expiresIn: expires_In,
                    audience: userId.toString(),
                    issuer: "p3.com",
                });
                // Store refresh token in Redis
                yield Redis_1.Redis.setValue(userId.toString(), refreshToken, redis_ex);
                return refreshToken;
            }
            catch (error) {
                console.error("Error generating refresh token:", error);
                throw error;
            }
        });
    }
    static jwtVerifyRefreshToken(refreshToken) {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, (0, environment_1.getEnvironmentVariables)().jwt_refresh_secret_key, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return reject(err);
                if (!decoded)
                    return reject(new Error("User is not authorized."));
                try {
                    // Match refresh token from Redis
                    const user = decoded;
                    const storedToken = yield Redis_1.Redis.getValue(user.aud);
                    if (storedToken === refreshToken) {
                        resolve(decoded);
                    }
                    else {
                        reject(new Error("Your session has expired, please login again!"));
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static gen_secret_key() {
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
exports.Jwt = Jwt;

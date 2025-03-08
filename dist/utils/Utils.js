"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const Bcrypt = __importStar(require("bcrypt"));
const multer_1 = __importDefault(require("multer"));
const dotenv = __importStar(require("dotenv"));
const storageOptions = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads/" + file.fieldname);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
class Utils {
    constructor() {
        this.MAX_TOKEN_TIME =24 * 60 * 60 * 1000;
        this.multer = (0, multer_1.default)({ storage: storageOptions, fileFilter });
        // currentDate(){
        //   return new Date().toLocaleDateString('en-US',{
        //     timeZone: 'Johannesburg'
        //    });
        // }
    }
    static generateVerificationToken(digit = 6) {
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < digit; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        // return parseInt(otp);
        return otp;
    }
    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
    static comparePassword(data) {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(data.password, data.encrypt_password, (err, same) => {
                if (err) {
                    reject(err);
                }
                else if (!same) {
                    reject(new Error("user & password doesn/t match!"));
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    static dotenvConfigs() {
        dotenv.config({ path: ".env" });
    }
}
exports.Utils = Utils;

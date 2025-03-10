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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const environment_1 = require("./enviroments/environment");
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const bodyParser = __importStar(require("body-parser"));
const BannerRouter_1 = __importDefault(require("./router/BannerRouter"));
const CityRouter_1 = __importDefault(require("./router/CityRouter"));
const CategoryRouter_1 = __importDefault(require("./router/CategoryRouter"));
const AddressRouter_1 = __importDefault(require("./router/AddressRouter"));
const OrderRouter_1 = __importDefault(require("./router/OrderRouter"));
const Utils_1 = require("./utils/Utils");
const Redis_1 = require("./utils/Redis");
const SubCategoryRouter_1 = __importDefault(require("./router/SubCategoryRouter"));
const StoreRouter_1 = __importDefault(require("./router/StoreRouter"));
const ProductRouter_1 = __importDefault(require("./router/ProductRouter"));
const CartRouter_1 = __importDefault(require("./router/CartRouter"));
//import { Jobs } from "./jobs/jobs";
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigs() {
        this.dotenvConfigs();
        this.connectMongoDB();
        this.connectRedis();
        this.allowCors();
        this.configureBodyParser();
        // this.runJobs()
    }
    dotenvConfigs() {
        Utils_1.Utils.dotenvConfigs();
    }
    allowCors() {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://miliwani-food-app.netlify.app"
        ];
        this.app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true, // Allow cookies & Authorization headers
            methods: "GET,POST,PUT,DELETE,OPTIONS",
            allowedHeaders: "Content-Type,Authorization"
        }));
    }
    connectMongoDB() {
        mongoose.connect((0, environment_1.getEnvironmentVariables)().db_url).then(() => {
            console.log("connected to mongodb.");
        });
    }
    connectRedis() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Redis_1.Redis.conncectToRedis();
                console.log("Connected to Redis.");
            }
            catch (error) {
                console.error("Error connecting to Redis:", error.message);
            }
        });
    }
    // runJobs(){
    //   Jobs.excuteJobs();
    // }
    setRoutes() {
        this.app.use("/src/uploads", express_1.default.static("src/uploads"));
        this.app.use("/api/user", UserRouter_1.default);
        this.app.use("/api/city", CityRouter_1.default);
        this.app.use("/api/banner", BannerRouter_1.default);
        this.app.use("/api/store", StoreRouter_1.default);
        this.app.use("/api/category", CategoryRouter_1.default);
        this.app.use("/api/sub_category", SubCategoryRouter_1.default);
        this.app.use("/api/cart", CartRouter_1.default);
        this.app.use("/api/product", ProductRouter_1.default);
        this.app.use("/api/address", AddressRouter_1.default);
        this.app.use("/api/order", OrderRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "not found",
                status_code: 404,
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "something went wrong,please try again",
                status_code: errorStatus,
            });
        });
    }
    configureBodyParser() {
        this.app.use(express_1.default.json()); // ✅ Required for JSON body
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
    }
}
exports.Server = Server;

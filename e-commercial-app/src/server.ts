import express from "express";
import * as mongoose from "mongoose";
import cors from "cors";
import { getEnvironmentVariables } from "./enviroments/environment";
import UserRouter from "./router/UserRouter";
import * as bodyParser from "body-parser";
import BannerRouter from "./router/BannerRouter";
import CityRouter from "./router/CityRouter";
import CategoryRouter from "./router/CategoryRouter";
import ItemRouter from "./router/ProductRouter";
import AddressRouter from "./router/AddressRouter";
import OrderRouter from "./router/OrderRouter";
import { Utils } from "./utils/Utils";
import { Redis } from "./utils/Redis";
import SubCategoryRouter from "./router/SubCategoryRouter";
import StoreRouter from "./router/StoreRouter";
import ProductRouter from "./router/ProductRouter";
import CartRouter from "./router/CartRouter";
//import { Jobs } from "./jobs/jobs";



export class Server {
  public app: express.Application = express();

  constructor() {
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
    Utils.dotenvConfigs();
  }
  allowCors() {
    const allowedOrigins = [
        "http://localhost:3000",
        "https://miliwani-food-app.netlify.app"
    ];

    this.app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies & Authorization headers
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization"
    }));
}

  connectMongoDB() {
    mongoose.connect(getEnvironmentVariables().db_url).then(() => {
      console.log("connected to mongodb.");
    });
  }

  async connectRedis() {
    try {
      Redis.conncectToRedis();
      console.log("Connected to Redis.");
    } catch (error) {
      console.error("Error connecting to Redis:", error.message);
    }
  }
  // runJobs(){
  //   Jobs.excuteJobs();
  // }
  setRoutes() {
    this.app.use("/src/uploads", express.static("src/uploads"));
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/city", CityRouter);
    this.app.use("/api/banner", BannerRouter);
    this.app.use("/api/store", StoreRouter);
    this.app.use("/api/category", CategoryRouter);
    this.app.use("/api/sub_category",SubCategoryRouter);
    this.app.use("/api/cart", CartRouter);
    this.app.use("/api/product", ProductRouter);
    this.app.use("/api/address", AddressRouter);
    this.app.use("/api/order", OrderRouter);
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
    this.app.use(express.json()); // ✅ Required for JSON body
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
}

}

import { Utils } from "../utils/Utils";
import { Enviroment } from "./environment";
Utils.dotenvConfigs();
export const DevEnviroment: Enviroment = {
  db_url: process.env.DEV_DB_URL as string,
  jwt_secret_key: process.env.DEV_JWT_SECRET_KEY as string,
  jwt_refresh_secret_key: process.env.DEV_REFRESH_TOKEN_SECRET as string,
  sendgrid: {
    api_key: process.env.DEV_SENDGRID_API_KEY,
    email_from: process.env.DEV_SENDGRID_EMAIL_FROM,
  },
  gmail_auth: {
    user: process.env.DEV_GMAIL_USER as string,
    pass: process.env.DEV_GMAIL_PASS as string,
  },
  // redis:{
  //     username:process.env.SERVER_REDIS_USERNAME,
  //     password:process.env.SERVER_REDIS_PASSWORD,
  //     host:process.env.SERVER_REDIS_HOST,
  //     port:process.env.SERVER_REDIS_PORT,
  // }
  redis: {
    username: '',
    password: '',
    host: process.env.LOCAL_REDIS_HOST as string,
    port: process.env.LOCAL_REDIS_PORT as string,
  },
  stripe:{
    publishable_key:process.env.DEV_STRPE_PUBLISHABLE_KEY as string,
  secret_key:process.env.DEV_STRIPE_SECRET_KEY as string
  }
};

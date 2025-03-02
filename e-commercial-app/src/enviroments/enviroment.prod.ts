import { Utils } from "../utils/Utils";
import { Enviroment } from "./environment";

Utils.dotenvConfigs();
export const ProdEnviroment: Enviroment = {
  db_url: process.env.PROD_DB_URL as string,
  jwt_secret_key: process.env.PROD_JWT_SECRET_KEY as string,
  jwt_refresh_secret_key: process.env.PROD_REFRESH_TOKEN_SECRET as string,
  sendgrid: {
    api_key: process.env.PROD_SENDGRID_API_KEY,
    email_from: process.env.PROD_SENDGRID_EMAIL_FROM,
  },
  // gmail_auth: {
  //   user: process.env.PROD_GMAIL_USER,
  //   pass: process.env.PROD_GMAIL_PASS,
  // },
  redis: {
    username: process.env.SERVER_REDIS_USERNAME,
    password: process.env.SERVER_REDIS_PASSWORD,
    host: process.env.SERVER_REDIS_HOST as string,
    port: process.env.SERVER_REDIS_PORT as string,
  },
  stripe:{
    publishable_key:process.env.PROD_STRPE_PUBLISHABLE_KEY as string,
  secret_key:process.env.PROD_STRIPE_SECRET_KEY as string
  },
  brevo: {
    smtp_host: process.env.BREVO_SMTP_HOST as string,
    smtp_port: process.env.BREVO_SMTP_PORT as string,
    smtp_secure: process.env.BREVO_SMTP_SECURE as string,
    smtp_user: process.env.BREVO_SMTP_USER as string,
    smtp_pass: process.env.BREVO_SMTP_PASS as string,
    from_email: process.env.BREVO_FROM_EMAIL as string, // Your verified email
  },
};

"use strict";
// import stripe from "stripe";
// import { getEnvironmentVariables } from "../enviroments/environment";
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
exports.StripeService = void 0;
// export class StripeService {
// private static _stripe=new stripe(getEnvironmentVariables().stripe.secret_key,{apiVersion:"2024-12-18.acacia"});
// static async checkout(data:{products:any[],deliveryCharge:number}){
//     try{
//         const session=await StripeService._stripe.checkout.sessions.create({
//             line_items:[
//                 ...data.products.map(product=>({
//                     price_data:{
//                         currency:'usd',
//                         product_data:{
//                             name:product.name,
//                             images:['http://localhost:3000/'+ product.cover]
//                         },
//                         unit_amount:product.price*100, 
//                     },
//                     quantity:product.quantity
//                 })),
//                 { 
//                     price_data:{
//                         currency:'inr',
//                         product_data:{
//                             name:'Delivery charge',
//                         },
//                             unit_amount:data.deliveryCharge,
//                         },quantity:1,
//                     },
//             ],
//             mode: 'payment',
//             success_url:"http://localhost:4200/success",
//             cancel_url:"http://localhost:4200/cancel"
//         });
//         return session;
//     }catch(e){
//         throw(e);
//     }
// }
// }
//////////////////////////////////
// import { getEnvironmentVariables } from "../enviroments/environment";
//   import Stripe from "stripe";
// export class StripeService {
//   private static stripe = new Stripe(getEnvironmentVariables().stripe.secret_key, {
//   apiVersion:"2024-12-18.acacia"
//   });
// static async checkout(orderData: any) {
//   try {
//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: orderData.products.map((product) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: product.product_name,
//             deliveryCharge: product.deliveryCharge
//             //description: product.description || "", // Optional
//            // images:['http://localhost:3000/'+ product.cover]  // Optional
//           },
//           unit_amount: Math.round(product.price * 100), // Convert to cents
//         },
//         quantity: product.quantity,
//       })),
//       mode: "payment",
//       success_url: "http://localhost:4200/success", // Replace with production URL
//       cancel_url: "http://localhost:4200/cancel", // Replace with production URL
//     });
//     return session;
//   } catch (error) {
//     console.error("Error creating Stripe session:", error.message);
//     throw error; // Rethrow the error for the calling function to handle
//   }
// }
const stripe_1 = require("stripe");
const environment_1 = require("../enviroments/environment");
class StripeService {
    static checkout(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield this._stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: [
                        // Map through the products and create line items
                        ...orderData.products.map((product) => ({
                            price_data: {
                                currency: "usd",
                                product_data: {
                                    name: product.product_name,
                                    // Optional fields
                                    // description: product.description || "",
                                    // images: product.cover ? [`http://localhost:3000/${product.cover}`] : undefined,
                                },
                                unit_amount: Math.round(product.price * 100), // Convert price to cents
                            },
                            quantity: product.quantity,
                        })),
                        // Add delivery charge as a separate line item
                        {
                            price_data: {
                                currency: "usd",
                                product_data: {
                                    name: "Delivery Charge", // Name of the delivery charge
                                },
                                unit_amount: Math.round(orderData.deliveryCharge * 100), // Convert delivery charge to cents
                            },
                            quantity: 1, // Always 1 as it's a single charge
                        },
                    ],
                    mode: "payment",
                    success_url: "http://localhost:4200/success", // Replace with your success URL
                    cancel_url: "http://localhost:4200/cancel", // Replace with your cancel URL
                });
                return session;
            }
            catch (error) {
                console.error("Error creating Stripe session:", error.message);
                throw error; // Rethrow the error for the calling function to handle
            }
        });
    }
    static createCustomer(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    email: email,
                    name: name,
                    // source:'',
                    // address:{
                    //   line1:'ABC',
                    //   postal_code:'',
                    //   city:'',
                    //   state:'',
                    //   country:''
                    // },
                    // description:'test customer',
                };
                const customer = yield this._stripe.customers.create(params);
                console.log(customer.id);
                return customer;
            }
            catch (e) {
                throw (e);
            }
        });
    }
}
exports.StripeService = StripeService;
StripeService._stripe = new stripe_1.default((0, environment_1.getEnvironmentVariables)().stripe.secret_key, { apiVersion: "2023-10-16" } // Use a valid Stripe API version
);

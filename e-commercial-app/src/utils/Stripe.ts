// import stripe from "stripe";
// import { getEnvironmentVariables } from "../enviroments/environment";


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


import stripe, { Stripe } from "stripe";
import { getEnvironmentVariables } from "../enviroments/environment";

export class StripeService {
  private static _stripe = new stripe(
    getEnvironmentVariables().stripe.secret_key,
    { apiVersion: "2023-10-16"as any} // Use a valid Stripe API version
  );

  static async checkout(orderData: any) {
    try {
      const session = await this._stripe.checkout.sessions.create({
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
    } catch (error) {
      console.error("Error creating Stripe session:", error.message);
      throw error; // Rethrow the error for the calling function to handle
    }
  }
    static async createCustomer(name:string,email:string){
    try{
      const params:Stripe.CustomerCreateParams={
        email:email,
        name:name,
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
      const customer: Stripe.Customer= await this._stripe.customers.create(params);
      console.log(customer.id);
      return customer;
    }catch(e){
      throw(e);
    }
  }
}
 
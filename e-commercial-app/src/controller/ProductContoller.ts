import Category from "../models/Category";
import Product from "../models/Product";
import Item from "../models/Product";

export class ProductController {
  static async addItem(req, res, next) {
    const productData = req.body;
    const files = req.files;
    
    try {
      //create item
      let product_data: any = {
        store_id: productData.store_id,
        product_name: productData.product_name,
        status: productData.status,
        description: productData.description,
        price: parseInt(productData.price),
        category_id: productData.category_id,
       
        //cover: path,
      };
      if (productData.variations)
        product_data = { ...product_data, variations: productData.variations };
      if (productData.specifications)
      if (productData.description)
        product_data = { ...product_data, description: productData.description };
      if (productData.specifications)
        product_data = { ...product_data, specifications: productData.specifications };
      if (productData.sub_category_id)
        product_data = { ...product_data, sub_category_id: productData.sub_category_id };
      if (productData.sku) product_data = { ...product_data, sku: productData.sku };
      if (productData.price) product_data = { ...product_data, price: productData.price };
      if (productData.stock_unit)
        product_data = { ...product_data, stock_unit: productData.stock_unit };

      if (files) {
        let images: any[] = [];
        images = files.map((x) => x.path);
        product_data = { ...product_data, images };
      }
console.log(product_data);
      const itemDoc = await new Item(product_data).save();
      res.send(itemDoc);
    
    } catch (e) {
      next(e);
    }
   
  }
  static async getProductByCategory(req, res, next) {
   
    try {
      const category_id=req.query.category_id;
      const sub_category_id=req.query.sub_category_id;
      let query :any={
        status:true,
        category_id
      };
      if(sub_category_id){
        query={...query,sub_category_id};

      }
      const products= await Item.find(query);
      res.json({
        products
      });
    } catch (e) {
      next(e);
    }
  }
  static async getMenu(req, res, next) {
    const restaurant = req.restaurant;

    try {
      const restaurant_id = req.params.restaurantId;
      const categories = await Category.find(
        { restaurant_id: restaurant_id },
        { __v: 0 }
      );
      const items = await Item.find({
        // status:true,
        restaurant_id: restaurant_id,
      });

      res.json({
        restaurant,
        categories,
        items,
      });
    } catch (e) {
      next(e);
    }
  }
}

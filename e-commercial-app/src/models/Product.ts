
import mongoose, { model } from'mongoose';

const metricSchema = new mongoose.Schema({
  orders: { type: Number },
  ratings: { type: Number },
});

const sizeSchema = new mongoose.Schema({
  size: { type: String },
  sku: { type: String },
  price: { type: Number },
  stock_unit: { type: Number },
});

const variationsSchema = new mongoose.Schema({
  type: { type: String },
  images: { type: String },
  sku: { type: String },
  price: { type: Number },
  stock_unit: { type: Number },
  size: [sizeSchema],
});

const productSchema = new mongoose.Schema({
  store_id: { type: mongoose.Types.ObjectId, ref: 'stores', required: true },
category_id: { type: mongoose.Types.ObjectId, ref:'categories', required: true },
  sub_category_id: { type: mongoose.Types.ObjectId, ref:'sub_categories' ,required:false},
product_name: { type: String, required: true},
  description: { type: String },
  specifications: { type: Object },
  sku: { type: String },
  images: [{ type: String }],
  price: { type: Number },
  stock_unit: { type: Number },
 metrics: metricSchema ,
 variations: [variationsSchema] ,
  status: { type: Boolean },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});
export default model('products', productSchema);

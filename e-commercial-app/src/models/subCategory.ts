import * as mongoose from "mongoose";
import { model } from "mongoose";

const subCategorySchema = new mongoose.Schema({
category_id: { type:mongoose.Types.ObjectId, ref:'categories', required: true },
  name: { type: String, required: true },
  photo: { type: String, required: false },
  status: { type: Boolean, requred: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});
export default model("sub_categories", subCategorySchema);

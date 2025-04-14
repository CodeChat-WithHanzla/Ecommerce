import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true
  }
});
export default model("Category", categorySchema);

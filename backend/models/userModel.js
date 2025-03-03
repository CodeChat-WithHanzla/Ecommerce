import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: false, default: false }
  },
  { timestamps: true }
);
const userModel = model("User", userSchema);
export default userModel;

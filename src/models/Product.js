import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

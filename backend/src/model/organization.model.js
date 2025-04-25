import mongoose from "mongoose";
const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  plan: { type: String, enum: ["2month", "6month", "1year", "2year"], required: true },
    price: { type: Number, required: true },
    phone: { type: Number, required: true },

    adminName: { type: String, required: true },
    address: { type: String, required: true },

  adminPass: { type: String, required: true,unique:true }, // You can hash it if needed
}, { timestamps: true });

export const Organization  = mongoose.model("Organization", organizationSchema);

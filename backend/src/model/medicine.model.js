// models/Medicine.js
import mongoose from "mongoose";
const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    departments: {
        type: [String],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,  // To automatically add createdAt and updatedAt fields
});

export const Medicine = mongoose.model('Medicine', medicineSchema);


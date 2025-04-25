import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
 
    employeeName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    joined: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    }, email: {
        type:String
    } ,
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  },
});

 export const Employee = mongoose.model("Employee", employeeSchema);


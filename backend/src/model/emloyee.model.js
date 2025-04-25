    import mongoose from "mongoose";
    const employeeSchema = new mongoose.Schema({
    
        name: {
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
        ref: "Organization",
        
        },
    type: {
        type: String, // "doctor" or "staff"
        enum: ["doctor", "staff"],
        required: true
        },
        paid: {
        type: String,
            default: "Paid",
            enum:["Paid","Pending","Advance"]
        },
        pendingSalary: {
        type: Number,
            default:null
    }
    });

    export const Employee = mongoose.model("Employee", employeeSchema);


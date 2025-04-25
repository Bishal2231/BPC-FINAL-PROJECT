import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required:true
    },
    
    organizationName: {
        type: String,
        required:true
    }, password: {
        type: String,
        required:true
    }, phoneNumber: {
        type: Number,
        unique:true
    }, email: {
        type: String,
        unique: true,
        required:true
  },
  avatar: {
    type: String,
    default: "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg",
  },
  role: {
        type: String,
        enum: ["admin", "user", "superAdmin"],
        default:"user"
  }, createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
    }, location: {
      type:String
  },
  department: {
    type:Array
  },
  isVerified: {
    type: Boolean,
    default: false,
  },  resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken:String,
    verificationTokenExpiresAt: Date,





})

// Middleware to update `updatedAt` field
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
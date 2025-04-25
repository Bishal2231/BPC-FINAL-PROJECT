import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { uploadoncloudinary } from "../utils/cloudinary.utils.js";
import { generateTokenAndSetCookie } from "../utils/verifyToken.js";
export const registerUser = async (req,res) => {
    console.log("req.body",req.body)
console.log("file",req.file)
    try {
         const { userName, organizationName, password, phoneNumber, email, location, } = req.body;
    if (!userName || !organizationName || !password || !email) {
      return res.status(400).json({ message: "Please provide all required fields." });
        }
        let avatarUrl;
        if (req.file) {
            avatarUrl=req.file?.path
        }
console.log("avatar urk ",avatarUrl)
        const cloudinaryUpload = await uploadoncloudinary(avatarUrl)
        console.log("coudinary",cloudinaryUpload.secure_url)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      organizationName,
      password: hashedPassword,
      phoneNumber,
      email,
      location,
      avatar:cloudinaryUpload?cloudinaryUpload.secure_url:null
    });

    // Save the user to the database
    await newUser.save();

    // Send response
    res.status(201).json({ message: "User registered successfully.", user: newUser });


    } catch (error) {
        console.log(error)
    }

}

export const loginUser = async (req, res) => { 
    const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
        const token = generateTokenAndSetCookie(res, user._id)

    // Send the token as a response
    res.json({
      message: 'Login successful',
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const verifyemail=async(req,res)=>{
try {
    
    const { code } = req.body
    console.log(code)

     const user= await User.findOne({
        verificationToken:code,
        verificationTokenExpiresAt:{$gte:Date.now()}


     })
     if(!user){
        return res.status(400).json({success:false,message:"invalid or expired verification code"})
     }
     user.isVerified=true;
     user.verificationToken=undefined;
     user.verificationTokenExpiresAt=undefined;
     await user.save()
    //  await sendWelcomeEmail(user.email,user.name)
    //  (verificationToken===code)
    return res.status(200).json({
        success:true,
        message:"email verified successfully",
        user:{
            ...user._doc,password:undefined
        }
    })

} catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
}
}

export const forgetpassword=async(req,res)=>{
    const {email}=req.body
    
    try {
        
        const user=await User.findOne({email})
        if(!user){
            throw new Error("invalid creditencial")
        }
//         const verificationToken=generateVerificationCOde()

//        await sendVerificationEmail(email,verificationToken)
//        user.verificationToken=verificationToken;
//   await user.save();



// genretate reset token

const resetToken=crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAr=Date.now()+1*60*60*60*1000;

user.resetPasswordToken=resetToken;
user.resetPasswordExpiresAt=resetTokenExpiresAr;

await user.save();

// send email
// await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-pasword/${resetToken}`);

return res.status(200).json({success:true,message:"reset email sent"})


    } catch (error) {
            console.log(error)
        return res.status(200).json({success:false,message:"foregt passwo unsuccessfull"})

        
    }
    

}
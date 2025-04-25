import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"


dotenv.config()

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET

})

const uploadoncloudinary= async function (avatarlocal){
try {
  
        if(!avatarlocal){
       
            console.log("avatar not found")
return "error at sending upload on clodunary"            
        }

     const uploadlink= await  cloudinary.uploader.upload(avatarlocal,{ transformation:[{quality:'auto',fetch_format:'auto'}]   ,  resource_type:"auto"})
        console.log("upload lin",uploadlink)
    fs.unlinkSync(avatarlocal)
     return uploadlink;
} catch (error) {
    fs.unlinkSync(avatarlocal)

   return null;
}
    
}
export {uploadoncloudinary}
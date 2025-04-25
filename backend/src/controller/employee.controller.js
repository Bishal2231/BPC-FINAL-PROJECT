import { uploadoncloudinary } from "../utils/cloudinary.utils.js";
import { Employee } from "../model/emloyee.model.js";
// export const handleEmployeeRegister = async (req, res) => {
//     try {
//         const { employeeName, role, department, joined, image, email, organization, type } = req.body;
//         console.log("req.body", req.body);
//         // const organization = req.user.organization; // Get organization ID from authenticated user

//         if (!organization) {
//             return res.status(400).json({ message: "User must be associated with an organization." });
//         }
//         // if (req.file){
//         //     res.status(400).json({ message: "Image is required." });
//         // }
//         let avatarUrl;
//           if (req.file) {
//             avatarUrl=req.file?.path
//         }
//   const cloudinaryUpload = await uploadoncloudinary(avatarUrl)
//         console.log("coudinary",cloudinaryUpload.secure_url)
//         const newEmployee = new Employee({
//             employeeName,
//             role,
//             department,
//             joined,
//             email,
//             organization,
//             type,
//             image:cloudinaryUpload ? cloudinaryUpload.secure_url : null
//         });
//         console.log("newEmployee", newEmployee);

//         await newEmployee.save();

//         res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }

// getall employee need a little logic update
export const handleEmployeeRegister = async (req, res) => {
    try {
        const { name, role, department, joined  , email, organization, type } = req.body;
        console.log("req.body", req.body);

        if (!organization) {
            return res.status(400).json({ message: "User must be associated with an organization." });
        }

        let avatarUrl;
        if (req.file) {
            avatarUrl = req.file?.path;
        }

        const cloudinaryUpload = await uploadoncloudinary(avatarUrl);
        console.log("cloudinary", cloudinaryUpload.secure_url);
console.log("-----")
        const newEmployee = await Employee.create({
            name,  // ✅ changed to match schema
            role,
            department,
            joined,
            email,
            organization,
            type,
            image: cloudinaryUpload ? cloudinaryUpload.secure_url : null
        });
console.log("newEmployee", newEmployee);
        res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getAllEmployees = async (req, res) => { 

    // const { orgid } = req.body;
  try {
      const employees = await Employee.find();
      console.log("employees", employees);
      res.status(200).json({ message: "Employees fetched successfully", employees });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }



}
export const getEmployInfo = async (req, res) => { 

    const { id } = req.params;
    console.log("id", id);
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee fetched successfully", employee });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }


}
export const removeEmployee = async (req, res) => {
    const { employeeId, email } = req.body;

    try {
        // Find and delete the employee by employeeId and email
        const result = await Employee.findOneAndDelete({ _id:employeeId, email });
console.log("result", result);
        if (result) {
            return res.status(200).json({ message: 'Employee removed successfully.' });
        } else {
            return res.status(404).json({ message: 'Employee not found or already removed.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred while removing the employee.' });
    }
}
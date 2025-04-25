
import { Medicine } from "../model/medicine.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.utils.js";
export const addmedicine = async (req, res) => {
    console.log("url hit for add medicine " );
    const { name, departments, quantity, company } = req.body;
    let imageUrl = '';

    // Step 1: Input Validation
    if (!name || !departments || !quantity || !company) {
        return res.status(400).json({
            message: 'Missing required fields: name, departments, quantity, or company.',
        });
    }

 
    // Step 2: Handle image upload
    if (req.file) {
        try {
            imageUrl = req.file?.path;
            const cloudinaryUpload = await uploadoncloudinary(imageUrl);
            console.log('Cloudinary Image URL:', cloudinaryUpload.secure_url);
            imageUrl = cloudinaryUpload.secure_url;  // Set the secure Cloudinary URL
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return res.status(500).json({
                message: 'Error uploading image to Cloudinary.',
                error: error.message,
            });
        }
    } else {
        return res.status(400).json({
            message: 'Image file is required.',
        });
    }

    // Step 3: Create new medicine
    try {
        const newMedicine = new Medicine({
            name,
            departments,
            quantity,
            company,
            image: imageUrl,
        });

        await newMedicine.save();

        // Return success response
        res.status(201).json({
            message: 'Medicine added successfully',
            data: newMedicine,
        });
    } catch (error) {
        console.error('Error saving medicine to database:', error);
        res.status(500).json({
            message: 'Error adding medicine to database.',
            error: error.message,
        });
    }
};

export const getAllMedicines =  async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).json({ data: medicines });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching medicines', error: error.message });
    }
}
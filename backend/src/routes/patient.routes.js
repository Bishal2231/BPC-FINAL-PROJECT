import express from "express";
import { Patient } from "../model/patient.model.js";
import { getAllPatient } from "../controller/patient.controller.js";
const router = express.Router();

router.get("/", getAllPatient);
router.post('/addpatient', async (req, res) => {   
  try {
    const { patientName, doctorName, department, appointmentDate, age, sex, address, phoneNumber } = req.body;
    
    // Validate required fields
    if (!patientName || !doctorName || !department || !appointmentDate || !age || !sex || !address || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new patient
    const newPatient = new Patient({
      patientName,
      doctorName,
      department,
      appointmentDate: new Date(appointmentDate),
      age,
      sex,
      address,
      phoneNumber
    });

    // Save to database
    const savedPatient = await newPatient.save();
    console.log('New patient created:', savedPatient);
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});





export default router;


    
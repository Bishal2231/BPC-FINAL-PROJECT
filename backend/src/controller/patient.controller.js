import { Patient } from "../model/patient.model.js";

export const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find();  // Fetch all patient data from the database
    res.status(200).json(patients);  // Return the patient data as JSON
  } catch (err) {
    console.error('Error fetching patient data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


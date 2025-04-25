import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  department: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // Added phone number field
}, { timestamps: true });

export  const Patient = mongoose.model('Patient', patientSchema);

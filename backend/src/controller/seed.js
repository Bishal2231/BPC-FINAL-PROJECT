import mongoose from "mongoose";
import { Employee } from "../model/emloyee.model.js";
mongoose.connect("mongodb://127.0.0.1:27017/BPCPROJECT");

const data = [
  // Doctors
  {
    id: "DOC001",
    name: "Dr. Emily Carter",
    role: "Dermatologist",
    department: "Dermatology",
    joined: "15 April 2022",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    type: "doctor"
  },
  {
    id: "DOC002",
    name: "Dr. Marcus Reed",
    role: "Orthopedic Surgeon",
    department: "Orthopedics",
    joined: "12 June 2021",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    type: "doctor"
  },
  // ... add other doctors

  // Staff
  {
    id: "HOS001",
    name: "Anthony Lewis",
    role: "Machine Cleaner",
    department: "Maintenance",
    joined: "30 May 2023",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    type: "staff"
  },
  {
    id: "HOS002",
    name: "Brian Villalobos",
    role: "Nurse Helper",
    department: "Nursing Assistance",
    joined: "30 May 2023",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    type: "staff"
  },
  // ... add other staff
];

async function seedData() {
  try {
      const send = await Employee.insertMany(data);
      console.log("Data inserted successfully:", send);
    mongoose.disconnect();
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

seedData();

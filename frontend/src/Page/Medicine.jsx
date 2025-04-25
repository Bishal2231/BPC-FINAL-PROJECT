import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

const initialMedicines = [
    {
        name: "Paracetamol",
        departments: ["Cardiology", "Pediatrics"],
        quantity: 50,
        company: "ABC Pharma",
        image: "https://nepalskinhospital.com/wp-content/uploads/2020/12/Rectangle-3.jpg",
    },
    {
        name: "Ibuprofen",
        departments: ["Orthopedics", "Neurology"],
        quantity: 30,
        company: "XYZ Pharma",
        image: "https://nepalskinhospital.com/wp-content/uploads/2020/12/Rectangle-3.jpg",
    },
    {
        name: "Aspirin",
        departments: ["Cardiology", "Neurology"],
        quantity: 25,
        company: "DEF Pharma",
        image: "https://nepalskinhospital.com/wp-content/uploads/2020/12/Rectangle-3.jpg",
    },
];

const MedicinePage = () => {
    const [medicines, setMedicines] = useState(initialMedicines);
    const [newMedicine, setNewMedicine] = useState({
        name: "",
        departments: [],
        quantity: "",
        company: "",
        image: "https://nepalskinhospital.com/wp-content/uploads/2020/12/Rectangle-3.jpg", // Default image
    });
    const [showForm, setShowForm] = useState(false); // State to toggle the visibility of the form

    const handleAddMedicine = () => {
        if (
            newMedicine.name &&
            newMedicine.departments.length > 0 &&
            newMedicine.quantity &&
            newMedicine.company
        ) {
            setMedicines([...medicines, newMedicine]);
            setNewMedicine({
                name: "",
                departments: [],
                quantity: "",
                company: "",
                image: "https://nepalskinhospital.com/wp-content/uploads/2020/12/Rectangle-3.jpg", // Reset image
            });
            setShowForm(false); // Close the form after adding medicine
        } else {
            alert("Please fill all the fields");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMedicine((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDepartmentChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setNewMedicine((prevState) => ({
            ...prevState,
            departments: selectedOptions,
        }));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-bold">Medicines List</h2>
                    <p className="text-gray-500 text-sm">Manage your hospital medicines</p>
                </div>
                <Button
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center"
                    onClick={() => setShowForm(true)} // Show the form when clicked
                >
                    <PlusCircle className="w-5 h-5 mr-2" /> Add Medicine
                </Button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Add New Medicine</h3>
                            <Button
                                className="text-red-500"
                                onClick={() => setShowForm(false)} // Close form
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="space-y-4 mt-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Medicine Name"
                                value={newMedicine.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg shadow-sm text-sm"
                            />
                            <select
                                name="departments"
                                value={newMedicine.departments}
                                onChange={handleDepartmentChange}
                                className="w-full p-2 border rounded-lg shadow-sm text-sm"
                                multiple
                            >
                                <option value="Cardiology">Cardiology</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Neurology">Neurology</option>
                            </select>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={newMedicine.quantity}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg shadow-sm text-sm"
                            />
                            <input
                                type="text"
                                name="company"
                                placeholder="Medicine Company"
                                value={newMedicine.company}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg shadow-sm text-sm"
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={newMedicine.image}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg shadow-sm text-sm"
                            />
                            <Button
                                onClick={handleAddMedicine}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Add Medicine
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Medicines List */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                {medicines.map((medicine, index) => (
                    <Card key={index} className="p-4 bg-white rounded-lg shadow-sm relative">
                        <h3 className="font-semibold text-lg mb-2">{medicine.name}</h3>
                        <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <div className="space-y-2">
                            <p>
                                <strong>Departments:</strong> {medicine.departments.join(", ")}
                            </p>
                            <p>
                                <strong>Quantity:</strong> {medicine.quantity}
                            </p>
                            <p>
                                <strong>Company:</strong> {medicine.company}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MedicinePage;

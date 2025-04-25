import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

const MedicinePage = () => {
    const [medicines, setMedicines] = useState([]);
    const [newMedicine, setNewMedicine] = useState({
        name: "",
        departments: [],
        quantity: "",
        company: "",
        image: "https://nepalskinhospital.com/wp-content/uploads/2020/12/Rectangle-3.jpg", // Default image
    });
    const [showForm, setShowForm] = useState(false); // State to toggle the visibility of the form

    // Fetch medicines from the API
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get("http://localhost:7180/medicine");
                setMedicines(response.data.data); // Set fetched medicines data
            } catch (error) {
                console.error("Error fetching medicines:", error);
            }
        };

        fetchMedicines();
    }, []);

    const handleAddMedicine = async () => {
        if (
            newMedicine.name &&
            newMedicine.departments.length > 0 &&
            newMedicine.quantity &&
            newMedicine.company
        ) {
            try {
                const formData = new FormData();
                formData.append("name", newMedicine.name);
                formData.append("departments", newMedicine.departments);
                formData.append("quantity", newMedicine.quantity);
                formData.append("company", newMedicine.company);
                formData.append("image", newMedicine.image); // You can change this to handle file uploads if required

                const response = await axios.post("http://localhost:7180/medicine/add", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // On success, add the new medicine to the state
                setMedicines([...medicines, response.data.data]);
                setNewMedicine({
                    name: "",
                    departments: [],
                    quantity: "",
                    company: "",
                    image: "", // Reset image
                });
                setShowForm(false); // Close the form after adding medicine
            } catch (error) {
                console.error("Error adding medicine:", error);
                alert("Failed to add medicine.");
            }
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
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
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
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(e) =>
                                    setNewMedicine((prevState) => ({
                                        ...prevState,
                                        image: e.target.files[0],
                                    }))
                                }
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
                    <Card
                        key={index}
                        className="p-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden"
                    >
                        <div
                            className="w-full h-40 bg-cover bg-center"
                            style={{ backgroundImage: `url(${medicine.image})` }}
                        ></div>

                        <div className="p-4">
                            <h3 className="font-semibold text-xl mb-3 text-gray-800">{medicine.name}</h3>
                            <div className="space-y-2 text-gray-700 text-sm">
                                <p>
                                    <strong className="text-gray-900">Departments:</strong> {medicine.departments.join(", ")}
                                </p>
                                <p>
                                    <strong className="text-gray-900">Quantity:</strong> {medicine.quantity}
                                </p>
                                <p>
                                    <strong className="text-gray-900">Company:</strong> {medicine.company}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MedicinePage;

// src/AppointmentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        axios.get('http://localhost:7180/patient')
            .then((response) => {
                // Assuming response.data contains the list of appointments
                setAppointments(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the patient data!', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Logic for deleting an appointment (you can use setState for updating)
        alert(`Deleting appointment with ID: ${id}`);
    };

    const handleEdit = (id) => {
        // Logic for editing an appointment (you could redirect to an edit page or show a modal)
        alert(`Editing appointment with ID: ${id}`);
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div>
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Patient Appointment List</h1>
            </div>
            <div className="cursor-pointer flex justify-end font-bold items-center">
                <Link to="/add-appointment" className=" flex items-center"> <h2 className="text-2xl">+</h2> <FaAddressBook className="text-xl" /> </Link>  
            </div>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-gray-600">Patient Name</th>
                            <th className="py-3 px-4 text-left text-gray-600">Doctor Name</th>
                            <th className="py-3 px-4 text-left text-gray-600">Department</th>
                            <th className="py-3 px-4 text-left text-gray-600">Appointment Date</th>
                            <th className="py-3 px-4 text-left text-gray-600">Age</th>
                            <th className="py-3 px-4 text-left text-gray-600">Sex</th>
                            <th className="py-3 px-4 text-left text-gray-600">Address</th>
                            <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-700">{appointment.patientName}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.doctorName}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.department}</td>
                                <td className="py-3 px-4 text-gray-700">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.age}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.sex}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.address}</td>
                                <td className="py-3 px-4 gap-5">
                                    <button
                                        onClick={() => handleEdit(appointment._id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(appointment._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentList;

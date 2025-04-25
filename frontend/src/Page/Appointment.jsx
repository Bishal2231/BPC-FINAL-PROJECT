// src/AppointmentList.js
import React from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
const appointments = [
    {
        id: "APPT001",
        patientName: "John Doe",
        doctorName: "Dr. Emily Carter",
        department: "Dermatology",
        appointmentDate: "2025-05-01",
        age: 29,
        address: "1234 Elm St, Springfield",
        sex: "Male",
    },
    {
        id: "APPT002",
        patientName: "Sarah Smith",
        doctorName: "Dr. Marcus Reed",
        department: "Orthopedics",
        appointmentDate: "2025-05-03",
        age: 34,
        address: "5678 Oak St, Springfield",
        sex: "Female",
    },
    {
        id: "APPT003",
        patientName: "Michael Johnson",
        doctorName: "Dr. Alan Kim",
        department: "Neurosurgery",
        appointmentDate: "2025-05-05",
        age: 40,
        address: "9102 Pine St, Springfield",
        sex: "Male",
    },
    {
        id: "APPT004",
        patientName: "Jessica Lee",
        doctorName: "Dr. Natalie Brooks",
        department: "Cardiology",
        appointmentDate: "2025-05-10",
        age: 25,
        address: "1357 Maple St, Springfield",
        sex: "Female",
    },
];

const AppointmentList = () => {
    const handleDelete = (id) => {
        // Logic for deleting an appointment (you can use setState for updating)
        alert(`Deleting appointment with ID: ${id}`);
    };

    const handleEdit = (id) => {
        // Logic for editing an appointment (you could redirect to an edit page or show a modal)
        alert(`Editing appointment with ID: ${id}`);
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 ">
            <div>             <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Patient Appointment List</h1>
</div>
            <div className=' cursor-pointer flex justify-end font-bold items-center'><h2 className='text-2xl'>  +</h2> <FaAddressBook className='text-xl '/>  </div>
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
                            <tr key={appointment.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-700">{appointment.patientName}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.doctorName}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.department}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.appointmentDate}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.age}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.sex}</td>
                                <td className="py-3 px-4 text-gray-700">{appointment.address}</td>
                                <td className="py-3 px-4 gap-5">
                                    <button
                                        onClick={() => handleEdit(appointment.id)}
                                        className="text-blue-500 hover:text-blue-700 "
                                    >
                                        <FaEdit/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(appointment.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <MdDelete/>
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

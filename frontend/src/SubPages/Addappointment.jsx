import React, { useState } from 'react';
import axios from 'axios';

const AddAppointmentForm = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        doctorName: '',
        department: '',
        appointmentDate: '',
        age: '',
        sex: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7180/patient/addpatient', formData);
            alert('Appointment added successfully');
            // You can reset the form or perform further actions here
            setFormData({
                patientName: '',
                doctorName: '',
                department: '',
                appointmentDate: '',
                age: '',
                sex: '',
                address: '',
                phoneNumber:'',
            });
        } catch (error) {
            console.error('Error adding appointment:', error);
            alert('Error adding appointment');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Add Appointment</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Patient Name</label>
                        <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">Doctor Name</label>
                        <input
                            type="text"
                            name="doctorName"
                            value={formData.doctorName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">Appointment Date</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                  
                    <div className="w-1/2">
                        <label className="block text-gray-700">Sex</label>
                        <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="w-1/2">
                    <label className="block text-gray-700">phoneNumber</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="w-full">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add Appointment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAppointmentForm;

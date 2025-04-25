import { useState } from 'react';
import axios from 'axios';
import { userAuthStore } from '../../authstore/Authstore';
import { useNavigate } from 'react-router-dom';
export function AddEmployeePage() {
    const navigate = useNavigate(); // ✅ valid here    
    const { user } = userAuthStore();
    const [formData, setFormData] = useState({
        name: '',  // Changed from employeeName to name
        role: '',
        department: '',
        joined: '',
        email: '',
        type: '',
        organization: user ? user.orgid : null,
        image:null
    });
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formDataToSend = new FormData();

            // Append the image file using correct field name
            if (imageFile) {
                formDataToSend.append('image', imageFile); // ✅ Use "image"
            }

            // Append other form fields
            formDataToSend.append('name', formData.name);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('department', formData.department);
            formDataToSend.append('joined', formData.joined);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('organization', formData.organization);

            const response = await axios.post(
                'http://localhost:7180/employee/register',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
console.log('Response:', response.data);
            setSuccess(true);
            setFormData({
                name: '',
                role: '',
                department: '',
                joined: '',
                email: '',
                type: '',
                organization: user ? user.orgid : null,
                image: null
            });
            setImageFile(null);
            setTimeout(() => {
                navigate('/');
            }, 4000); // Wait 
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
            setError(errorMsg);
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    Employee registered successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {['name', 'role', 'department', 'joined', 'email'].map(field => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                            {field === 'name' ? 'Employee Name' : field.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type={field === 'joined' ? 'date' : field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                        />
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                    >
                        <option value="">Select Type</option>
                        <option value="doctor">Doctor</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                    />
                    {imageFile && (
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            className="mt-4 w-32 h-32 object-cover rounded"
                        />
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Registering...' : 'Register Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
}
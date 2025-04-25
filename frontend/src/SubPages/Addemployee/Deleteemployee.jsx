import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export function RemoveEmployeePage() {
    const navigate = useNavigate(); // ✅ valid here
    const [formData, setFormData] = useState({
        employeeId: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');  // Clear any previous message

        try {
            // Sending DELETE request using axios
            const response = await axios.delete('http://localhost:7180/employee/remove', {
                data: {
                    employeeId: formData.employeeId,
                    email: formData.email
                }
            });

            if (response.status === 200) {
                setMessage('Employee removed successfully!');
                setTimeout(() => {
                    navigate('/');
                }, 4000); // Wait 
            } else {
                setMessage(`Error: ${response.data.message || 'Unable to remove employee.'}`);
            }
        } catch (error) {
            // Handle error response from API
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || 'Unable to reach the server.'}`);
            } else {
                setMessage('Error: Unable to reach the server.');
            }
        }

        setIsLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Remove Employee</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button type="submit" disabled={isLoading} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
                        {isLoading ? 'Removing...' : 'Remove Employee'}
                    </button>
                </div>
            </form>

            {message && (
                <div className={`mt-4 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

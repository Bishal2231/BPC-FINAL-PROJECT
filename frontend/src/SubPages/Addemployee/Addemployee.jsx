import { useState } from 'react';

export  function AddEmployeePage() {
    const [formData, setFormData] = useState({
        employeeName: '',
        role: '',
        department: '',
        joined: '',
        image: null,
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setFormData(prev => ({ ...prev, [name]: file }));
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Registered Employee:", formData);
        alert("Registration Complete");
        setIsLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {['employeeName', 'role', 'department', 'joined', 'email'].map(field => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            type={field === 'joined' ? 'date' : field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required={field !== 'email'}
                            className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                        />
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image Upload</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded" />
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <button type="submit" disabled={isLoading} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
                        {isLoading ? 'Adding...' : 'Register Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
}

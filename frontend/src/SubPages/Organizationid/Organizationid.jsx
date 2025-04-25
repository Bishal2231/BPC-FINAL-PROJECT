import { useState } from 'react';
import axios from 'axios';
import { userAuthStore } from '../../authstore/Authstore';
import { useNavigate } from 'react-router-dom';
export default function OrganizationForm() {
    const navigate = useNavigate(); // ✅ valid here
    const { createOrganization } = userAuthStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        plan: '',
        adminName: '',
        adminPass: '',
        phone: '',
        address: ''
    });

    const planPrices = {
        "2month": 1000,
        "6month": 2500,
        "1year": 4000,
        "2year": 7000
    };

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const price = planPrices[formData.plan];
        try {
            const result = await createOrganization({ ...formData, price });
            console.log("result", result.data);
            if (result.status === 200 || result.status === 201) { 
                navigate('/')
                alert("you will get your admin pass in your email.stay tuned");
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Create Organization</h2>

            <input
                name="name"
                onChange={handleChange}
                placeholder="Organization Name"
                className="block w-full p-2 mb-3 border"
                required
            />

            <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Organization Email"
                className="block w-full p-2 mb-3 border"
                required
            />

            <input
                name="phone"
                type="tel"
                onChange={handleChange}
                placeholder="Organization Phone"
                className="block w-full p-2 mb-3 border"
                required
            />

            <input
                name="address"
                onChange={handleChange}
                placeholder="Organization Address"
                className="block w-full p-2 mb-3 border"
                required
            />

            <select
                name="plan"
                onChange={handleChange}
                className="block w-full p-2 mb-3 border"
                required
            >
                <option value="">Select Plan</option>
                <option value="2month">2 Months - ₹1000</option>
                <option value="6month">6 Months - ₹2500</option>
                <option value="1year">1 Year - ₹4000</option>
                <option value="2year">2 Years - ₹7000</option>
            </select>

            <input
                name="adminName"
                onChange={handleChange}
                placeholder="Admin Name"
                className="block w-full p-2 mb-3 border"
                required
            />

            <input
                name="adminPass"
                type="password"
                onChange={handleChange}
                placeholder="Admin Password"
                className="block w-full p-2 mb-3 border"
                required
            />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
        </form>
    );
}

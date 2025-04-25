import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // To get the employee ID from the URL

const EmployeeDetailsPage = () => {
    const { id } = useParams();  // Fetch the employee ID from the URL parameters
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch employee data from backend
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`http://localhost:7180/employee/detail/${id}`);
                console.log("response", response)
                if (!response.ok) {
                    throw new Error("Employee not found");
                }
                const data = await response.json();
                console.log("data", data)
                setEmployee(data.employee);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="employee-details-container">
            <h2 className="text-2xl font-bold">Employee Details</h2>
            <div className="employee-details">
                <p><strong>Employee ID:</strong> {employee._id}</p>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Role:</strong> {employee.role}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Joined:</strong> {new Date(employee.joined).toLocaleDateString()}</p>
                <p><strong>Type:</strong> {employee.type}</p>
                <p><strong>Email:</strong> {employee.email || "Not provided"}</p>

                <div>
                    <strong>Image:</strong>
                    <img
                        src={employee.image}
                        alt={`${employee.name}'s Profile`}
                        className="employee-image"
                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailsPage;

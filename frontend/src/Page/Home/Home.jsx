import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Settings, Users, UserCheck, MoreVertical } from "lucide-react";
import Nav from "../../components/essentials/Nav";
import TopNav from "../../components/essentials/TopNav";
import { FaUserDoctor } from "react-icons/fa6";
import { MdCoPresent } from "react-icons/md";
import { userAuthStore } from "../../authstore/Authstore";
import { Link } from "react-router-dom";

const Home = () => {
    const [showDoctors, setShowDoctors] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getEmployees } = userAuthStore()
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getEmployees();
                if (!response.status==200 || !response.status==201) {
                    throw new Error("Failed to fetch employees");
                }
                const data = response.data;
                setEmployees(data.employees);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleToggle = () => {
        setShowDoctors(!showDoctors);
    };

    const filteredData = employees.filter((person) =>
        showDoctors ? person.type === "doctor" : person.type === "staff"
    );

    // Format date to be more readable
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <div className="m-3 min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="m-3 min-h-screen flex items-center justify-center">Error: {error}</div>;
    }

    // Calculate stats from the API data
    const totalStaff = employees.length;
    const activeStaff = employees.length; // Assuming all are active for now
    const totalDoctors = employees.filter(emp => emp.type === "doctor").length;
    const activeDoctors = employees.filter(emp => emp.type === "doctor").length; // Assuming all are active

    return (
        <div className="m-3 min-h-screen flex flex-col gap-4">
            <div className="pt-10 mt-[18rem] w-[80%] transition-all duration-500 ease-in-out">
                {/* Stats Section */}
                <div className="grid grid-cols-4 gap-4">
                    <Card className="bg-purple-600 text-white p-3 flex-row items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold">Total Staff</h3>
                            <p className="text-xl">{totalStaff}</p>
                        </div>
                        <Users className="text-white w-5 h-5" />
                    </Card>
                    <Card className="bg-green-600 text-white p-3 flex items-center flex-row justify-between">
                        <div>
                            <h3 className="text-sm font-semibold">Active Staff</h3>
                            <p className="text-xl">{activeStaff}</p>
                        </div>
                        <UserCheck className="text-white w-5 h-5" />
                    </Card>
                    <Card className="bg-blue-900 text-white p-3 flex items-center flex-row justify-between">
                        <div>
                            <h3 className="text-sm font-semibold">Total Doctor</h3>
                            <p className="text-xl">{totalDoctors}</p>
                        </div>
                        <FaUserDoctor className="text-white w-5 h-5" />
                    </Card>
                    <Card className="bg-blue-600 text-white p-3 flex items-center flex-row justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-nowrap">Active Doctor </h3>
                            <p className="text-xl">{activeDoctors}</p>
                        </div>
                        <MdCoPresent className="text-white w-5 h-5" />
                    </Card>
                </div>

                {/* Search and Filters */}
                <div className="flex justify-between items-center mb-6 p-4 bg-white shadow rounded-lg mt-3">
                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full p-2 border rounded-lg shadow-sm text-sm"
                        />
                        <Search className="absolute right-3 top-2 text-gray-500 w-4 h-4" />
                    </div>

                    <div className="space-x-4 text-sm">
                        <Link to="/addemployee">    <Button variant="outline"> Add Employees</Button></Link>
                            <Link to="/employee/remove">     <Button variant="outline">Remove Employees</Button></Link>
                    </div>
                </div>

                {/* Toggle Button */}
                <div className="flex items-center justify-around m-6 p-4 bg-white shadow rounded-lg mt-3">
                    <h2
                        className={`text-xl cursor-pointer flex items-center gap-2 font-semibold ${showDoctors ? "border-b-2" : ""
                            }`}
                        onClick={() => !showDoctors && handleToggle()}
                    >
                        <FaUserDoctor /> Doctor
                    </h2>

                    <h2
                        className={`text-xl cursor-pointer flex items-center gap-2 font-semibold ${!showDoctors ? "border-b-2" : ""
                            }`}
                        onClick={() => showDoctors && handleToggle()}
                    >
                        <Users /> Staff
                    </h2>
                </div>

                {/* Staff Cards */}
                <div className="grid grid-cols-3 gap-4 mt-3">
                    {filteredData.map((emp) => (
                        <Card key={emp._id} className="p-3 bg-white shadow rounded-lg text-sm relative">
                            <CardContent className="flex flex-col items-center">
                                <Link to={`/employee-detail/${emp._id}`}>
                                    <img
                                    src={emp.image}
                                    alt={emp.name}
                                    className="w-12 h-12 rounded-full mb-2"
                                /> </Link>   
                                <p className="text-orange-600 font-semibold text-xs">EMP ID: {emp._id.slice(-6)}</p>
                                <h4 className="text-sm font-bold">{emp.name}</h4>
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-xs mt-1">
                                    {emp.role}
                                </span>
                                <div className="mt-2 w-full flex justify-between text-gray-600 text-xs">
                                    <p>Joined: {formatDate(emp.joined)}</p>
                                    <p>Dept: {emp.department}</p>
                                </div>
                            </CardContent>
                            <MoreVertical className="absolute top-3 right-3 text-gray-500 w-4 h-4 cursor-pointer" />
                        </Card>
                    ))}
                </div>

                {/* Settings Button */}
                <div className="fixed bottom-6 right-6 bg-orange-500 p-3 rounded-full shadow-lg cursor-pointer">
                    <Settings className="text-white w-6 h-6" />
                </div>
            </div>
        </div>
    );
};

export default Home;
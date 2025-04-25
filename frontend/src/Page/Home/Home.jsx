import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Settings, Users, UserCheck, UserX, UserPlus, MoreVertical } from "lucide-react";
import Nav from "../../components/essentials/Nav";
import TopNav from "../../components/essentials/TopNav";
import { FaUserDoctor } from "react-icons/fa6";
import { MdCoPresent } from "react-icons/md";

const employees = [
    {
        id: "HOS001",
        name: "Anthony Lewis",
        role: "Machine Cleaner",
        department: "Maintenance",
        joined: "30 May 2023",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "HOS002",
        name: "Brian Villalobos",
        role: "Nurse Helper",
        department: "Nursing Assistance",
        joined: "30 May 2023",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        id: "HOS003",
        name: "Harvey Smith",
        role: "Room Cleaner",
        department: "Housekeeping",
        joined: "30 May 2023",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        id: "HOS004",
        name: "Sophia Martin",
        role: "Dressing Assistant",
        department: "Wound Care",
        joined: "05 June 2023",
        image: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
        id: "HOS005",
        name: "Ethan Clark",
        role: "Billing Staff",
        department: "Accounts",
        joined: "12 June 2023",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
        id: "HOS006",
        name: "Isabella Gomez",
        role: "Pharmacist Assistant",
        department: "Pharmacy",
        joined: "15 June 2023",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
        id: "HOS007",
        name: "Liam Wilson",
        role: "Emergency Response Staff",
        department: "Emergency",
        joined: "20 June 2023",
        image: "https://randomuser.me/api/portraits/men/13.jpg",
    },
];

const doctors = [
    {
        id: "DOC001",
        name: "Dr. Emily Carter",
        role: "Dermatologist",
        department: "Dermatology",
        joined: "15 April 2022",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        id: "DOC002",
        name: "Dr. Marcus Reed",
        role: "Orthopedic Surgeon",
        department: "Orthopedics",
        joined: "12 June 2021",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        id: "DOC003",
        name: "Dr. Natalie Brooks",
        role: "Cardiologist",
        department: "Cardiology",
        joined: "23 February 2023",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        id: "DOC004",
        name: "Dr. Alan Kim",
        role: "Neurosurgeon",
        department: "Neurosurgery",
        joined: "01 March 2020",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
        id: "DOC005",
        name: "Dr. Olivia Smith",
        role: "General Surgeon",
        department: "Surgery",
        joined: "19 July 2022",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
];


const Home = () => {

    const [active,Setactive]=useState(true)

    if (active) { 
        console.log("Doctor is active")
    }
    const handleToggle = () => { 
        Setactive(!active)
    }

    return (
        <div className="m-3  min-h-screen flex flex-col gap-4">
    
            <div 
                className="pt-10  mt-[18rem] w-[80%] transition-all duration-500 ease-in-out ">
                {/* Stats Section */}
                <div className="grid grid-cols-4 gap-4 ">
                    <Card className="bg-purple-600 text-white p-3 flex-row items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold">Total Staff</h3>
                            <p className="text-xl">1007</p>
                        </div>
                        <Users className="text-white w-5 h-5" />
                    </Card>
                    <Card className="bg-green-600 text-white p-3 flex items-center flex-row justify-between">
                        <div>
                            <h3 className="text-sm font-semibold">Active Staff</h3>
                            <p className="text-xl">1007</p>
                        </div>
                        <UserCheck className="text-white w-5 h-5" />
                    </Card>
                    <Card className="bg-blue-900 text-white p-3 flex items-center flex-row justify-between">
                        <div>
                            <h3 className="text-sm font-semibold">Total Doctor</h3>
                            <p className="text-xl">1007</p>
                        </div>
                        <FaUserDoctor className="text-white w-5 h-5" />
                    </Card>
                    <Card className="bg-blue-600 text-white p-3 flex items-center flex-row justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-nowrap">Active Doctor </h3>
                            <p className="text-xl">67</p>
                        </div>
                        <MdCoPresent className="text-white w-5 h-5 " />
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
                        <Button variant="outline">Add Employees</Button>
                        <Button variant="outline">Remove Employees</Button>
                    </div>
                </div>

                
                <div className={`flex items-center justify-around m-6 p-4   bg-white shadow rounded-lg mt-3`}>
                    <h2 className={`text-xl cursor-pointer  flex  items-center  gap-2  font-semibold ${active ? 'border-b-2 ' : null}`}   onClick={()=>!active?handleToggle():null}>
                     <FaUserDoctor/>   Doctor
                    </h2>

                    <h2 className={`text-xl cursor-pointer flex items-center gap-2  font-semibold ${active ? null : 'border-b-2'}`} onClick={() => active ? handleToggle() : null}>
                    <Users/>    Staff</h2>
                </div>


                {/* Employee Cards */}
                <div className="grid grid-cols-3 gap-4 mt-3">

                    {(active ? doctors: employees).map((emp) => (
                        <Card key={emp.id} className="p-3 bg-white shadow rounded-lg text-sm">
                            <CardContent className="flex flex-col items-center">
                                <img
                                    src={emp.image}
                                    alt={emp.name}
                                    className="w-12 h-12 rounded-full mb-2"
                                />
                                <p className="text-orange-600 font-semibold text-xs">EMP ID: {emp.id}</p>
                                <h4 className="text-sm font-bold">{emp.name}</h4>
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-xs mt-1">
                                    {emp.role}
                                </span>
                                <div className="mt-2 w-full flex justify-between text-gray-600 text-xs">
                                    <p>Joined: {emp.joined}</p>
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
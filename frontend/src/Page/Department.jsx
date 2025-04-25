import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  PlusCircle,
  ChevronDown,
  Grid,
  List,
  Settings,
} from "lucide-react";

// Doctor Departments
const doctorDepartments = [
  {
    name: "Cardiology",
    manager: "Dr. Andrea Miles",
    members: 6,
    image: "https://randomuser.me/api/portraits/women/51.jpg",
  },
  {
    name: "Pediatrics",
    manager: "Dr. Emily Harper",
    members: 5,
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    name: "Neurology",
    manager: "Dr. Charles Ray",
    members: 4,
    image: "https://randomuser.me/api/portraits/men/53.jpg",
  },
  {
    name: "Orthopedics",
    manager: "Dr. Helen Carter",
    members: 3,
    image: "https://randomuser.me/api/portraits/women/54.jpg",
  },
];

// Staff Departments
const staffDepartments = [
  {
    name: "Human Resources",
    manager: "Susan Lopez",
    members: 10,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Accounts",
    manager: "Mitchum Daniel",
    members: 8,
    image: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    name: "Admin",
    manager: "Robert Grossman",
    members: 5,
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    name: "Quality Assurance",
    manager: "N/A",
    members: 4,
    image: "https://randomuser.me/api/portraits/men/26.jpg",
  },
];

const Department = () => {
  const [view, setView] = useState("grid");
  const [selectedType, setSelectedType] = useState("doctor");

  const departmentsToShow =
    selectedType === "doctor" ? doctorDepartments : staffDepartments;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Departments</h2>
          <p className="text-gray-500 text-sm">Manage your hospital departments</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="p-2" title="List View" onClick={() => setView("list")}>
            <List className="w-5 h-5 text-gray-500" />
          </Button>
          <Button variant="outline" className="p-2" title="Grid View" onClick={() => setView("grid")}>
            <Grid className="w-5 h-5 text-orange-500" />
          </Button>
          <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center">
            <PlusCircle className="w-5 h-5 mr-2" /> Add Department
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow-sm">
        <div className="relative flex items-center w-1/3">
          <Search className="absolute left-3 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 border rounded-lg shadow-sm text-sm"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setSelectedType("doctor")}
            className={`px-4 py-2 rounded-lg text-sm shadow-sm ${selectedType === "doctor"
                ? "bg-orange-500 text-white"
                : "bg-white border text-gray-500"
              }`}
          >
            Doctor Departments
          </Button>
          <Button
            onClick={() => setSelectedType("staff")}
            className={`px-4 py-2 rounded-lg text-sm shadow-sm ${selectedType === "staff"
                ? "bg-orange-500 text-white"
                : "bg-white border text-gray-500"
              }`}
          >
            Staff Departments
          </Button>
          <Button className="bg-white border text-gray-500 rounded-lg shadow-sm text-sm px-3 py-2">
            Sort By: Last 7 Days <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className={view === "grid" ? "grid grid-cols-3 gap-4" : "space-y-4"}>
        {departmentsToShow.map((dept, index) => (
          <Card key={index} className="p-4 bg-white rounded-lg shadow-sm relative">
            <h3 className="font-semibold text-lg mb-2 flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {dept.name}
              </span>
              <Button variant="ghost" className="text-gray-500">
                <Settings className="w-4 h-4" />
              </Button>
            </h3>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
              <img src={dept.image} alt={dept.manager} className="w-12 h-12 rounded-full mb-2" />
              <p className="font-medium">{dept.manager}</p>
            </div>
            <p className="mt-2 text-gray-600 text-sm">
              Total Members: {dept.members.toString().padStart(2, "0")}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Department;

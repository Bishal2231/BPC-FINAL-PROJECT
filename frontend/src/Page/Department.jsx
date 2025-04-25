import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  PlusCircle,
  ChevronDown,
  Grid,
  List,
  Settings,
  X,
} from "lucide-react";

const Department = () => {
  const [view, setView] = useState("grid");
  const [selectedType, setSelectedType] = useState("doctor");
  const [departments, setDepartments] = useState({
    doctor: [],
    staff: []
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:7180/employee/getallemployee");
        const data = await response.json();

        if (data.employees && Array.isArray(data.employees)) {
          const grouped = data.employees.reduce((acc, employee) => {
            const type = employee.type === "doctor" ? "doctor" : "staff";
            const departmentName = employee.department || "Uncategorized";

            if (!acc[type][departmentName]) {
              acc[type][departmentName] = {
                name: departmentName,
                manager: null,
                members: [],
                image: employee.image
              };
            }

            acc[type][departmentName].members.push(employee);

            if (!acc[type][departmentName].manager) {
              acc[type][departmentName].manager = employee.name;
              acc[type][departmentName].managerImage = employee.image;
            }

            return acc;
          }, { doctor: {}, staff: {} });

          setDepartments({
            doctor: Object.values(grouped.doctor),
            staff: Object.values(grouped.staff)
          });
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredDepartments = departments[selectedType].filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.manager && dept.manager.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openEmployeeModal = (department) => {
    setSelectedDepartment(department);
    setShowEmployeeModal(true);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Employee Modal/Popup */}
      {showEmployeeModal && selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">
                {selectedDepartment.name} - All Members ({selectedDepartment.members.length})
              </h3>
              <button
                onClick={() => setShowEmployeeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedDepartment.members.map((employee, index) => (
                  <div key={index} className="border rounded-lg p-4 flex items-center space-x-4">
                    <img
                      src={employee.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{employee.name}</h4>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                      <p className="text-xs text-gray-500">{employee.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t p-4 flex justify-end">
              <Button
                onClick={() => setShowEmployeeModal(false)}
                className="bg-orange-500 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
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
            placeholder="Search departments or managers"
            className="w-full p-2 pl-10 border rounded-lg shadow-sm text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {filteredDepartments.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No departments found matching your search</p>
        </div>
      ) : (
        <div className={view === "grid" ? "grid grid-cols-3 gap-4" : "space-y-4"}>
          {filteredDepartments.map((dept, index) => (
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
                <img
                  src={dept.managerImage || dept.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
                  alt={dept.manager}
                  className="w-12 h-12 rounded-full mb-2"
                />
                <p className="font-medium">{dept.manager || "No manager assigned"}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600 text-sm">
                  Total Members: {dept.members.length.toString().padStart(2, "0")}
                </p>
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={() => openEmployeeModal(dept)}
                >
                  See All
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Department;
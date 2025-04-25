import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Trash2, Edit, CheckSquare, ChevronDown, FileText, FileSpreadsheet, RefreshCw, ChevronUp, Settings } from "lucide-react";

const shift = [
  { name: "Fixed", timing: "09:00 AM - 06:00 PM", weekOff: "Sunday, Monday", createdOn: "04 Aug 2024", status: "Active" },
  { name: "Rotating", timing: "06:00 AM - 03:00 PM", weekOff: "Saturday, Sunday", createdOn: "21 July 2024", status: "Active" },
  { name: "Split", timing: "03:00 AM - 09:00 PM", weekOff: "Tuesday, Saturday", createdOn: "31 Jan 2024", status: "Active" },
  { name: "On-Call", timing: "09:00 AM - 06:00 PM", weekOff: "Monday", createdOn: "15 May 2024", status: "Active" },
  { name: "Weekend", timing: "06:00 AM - 03:00 PM", weekOff: "Friday", createdOn: "04 Aug 2024", status: "Active" },
];

export  const Shifts = () => {
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Select Status");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Shifts</h2>
          <p className="text-gray-500 text-sm">Manage your shifts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="p-2" title="Export as PDF">
            <FileText className="w-5 h-5 text-red-500" />
          </Button>
          <Button variant="outline" className="p-2" title="Export as Excel">
            <FileSpreadsheet className="w-5 h-5 text-green-500" />
          </Button>
          <Button variant="outline" className="p-2" title="Refresh">
            <RefreshCw className="w-5 h-5 text-gray-500" />
          </Button>
          <Button variant="outline" className="p-2" title="Collapse">
            <ChevronUp className="w-5 h-5 text-gray-500" />
          </Button>
          <Button className="bg-orange-500 text-white flex items-center">
            <PlusCircle className="w-4 h-4 mr-2" /> Add Shift
          </Button>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow-sm">
        <div className="relative flex items-center w-1/3">
          <Search className="absolute left-3 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 border rounded-lg shadow-sm text-sm"
          />
        </div>
        <div className="relative">
          <Button 
            className="ml-2 flex items-center bg-white border text-gray-500 rounded-lg shadow-sm text-sm px-3 py-2"
            onClick={() => setStatusDropdown(!statusDropdown)}
          >
            {selectedStatus} <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
          {statusDropdown && (
            <div className="absolute bg-white shadow-md rounded-lg mt-2 w-32">
              <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedStatus("Active"); setStatusDropdown(false); }}>Active</p>
              <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedStatus("Inactive"); setStatusDropdown(false); }}>Inactive</p>
            </div>
          )}
        </div>
      </div>

      {/* Shift Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2"><CheckSquare className="w-4 h-4 text-gray-500" /></th>
              <th className="p-2">Shift Name</th>
              <th className="p-2">Timing</th>
              <th className="p-2">Week Off</th>
              <th className="p-2">Created On</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shift.map((shift, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2"><input type="checkbox" className="w-4 h-4" /></td>
                <td className="p-2">{shift.name}</td>
                <td className="p-2">{shift.timing}</td>
                <td className="p-2">{shift.weekOff}</td>
                <td className="p-2">{shift.createdOn}</td>
                <td className="p-2">
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
                    {shift.status}
                  </span>
                </td>
                <td className="p-2 flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Settings Button */}
      <div className="fixed bottom-6 right-6 bg-orange-500 p-3 rounded-full shadow-lg cursor-pointer">
        <Settings className="text-white w-6 h-6" />
      </div>
    </div>
  );
};


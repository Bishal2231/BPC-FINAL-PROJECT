import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Settings, Edit, Trash2 } from "lucide-react";

const leaves = [
  { type: "Sick Leave", from: "24 Dec 2024", to: "24 Dec 2024", days: "01 Day", applied: "23 Dec 2024", status: "Approved" },
  { type: "Casual Leave", from: "10 Dec 2024", to: "10 Dec 2024", days: "01 Day", applied: "09 Dec 2024", status: "Approved" },
  { type: "Casual Leave", from: "27 Nov 2024", to: "28 Nov 2024", days: "02 Day", applied: "26 Nov 2024", status: "Applied" },
  { type: "Sick Leave", from: "18 Nov 2024", to: "18 Nov 2024", days: "02 hrs", applied: "18 Nov 2024", status: "Approved" },
  { type: "Casual Leave", from: "06 Nov 2024", to: "08 Nov 2024", days: "03 Days", applied: "05 Nov 2024", status: "Approved" },
  { type: "Sick Leave", from: "25 Oct 2024", to: "25 Oct 2024", days: "01 Day", applied: "24 Oct 2024", status: "Rejected" },
  { type: "Casual Leave", from: "14 Oct 2024", to: "15 Oct 2024", days: "02 Day", applied: "13 Oct 2024", status: "Approved" },
];

const statusColors = {
  Approved: "bg-green-500",
  Applied: "bg-purple-500",
  Rejected: "bg-red-500",
};

export  function Empleave() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Leaves</h2>
        <Button className="bg-orange-500 text-white">Apply Leave</Button>
      </div>
      <p className="text-gray-600">Manage your Leaves</p>
      <Card className="mt-4">
        <CardContent>
          <div className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded">
            <Input placeholder="Search" className="w-1/3" />
            <div className="flex gap-4">
              <Button onClick={() => setShowCalendar(!showCalendar)}>Select Date</Button>
              {showCalendar && <div className="absolute top-full mt-2 z-10 bg-white shadow-lg p-2 rounded"><Calendar /></div>}
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>From Date</TableHead>
                  <TableHead>To Date</TableHead>
                  <TableHead>Days/Hours</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.map((leave, index) => (
                  <TableRow key={index}>
                    <TableCell>{leave.type}</TableCell>
                    <TableCell>{leave.from}</TableCell>
                    <TableCell>{leave.to}</TableCell>
                    <TableCell>{leave.days}</TableCell>
                    <TableCell>{leave.applied}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-white rounded ${statusColors[leave.status]}`}>{leave.status}</span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="fixed bottom-6 right-6 p-3 bg-orange-500 text-white rounded-full shadow-lg">
        <Settings className="w-6 h-6" />
      </div>
    </div>
  );
}

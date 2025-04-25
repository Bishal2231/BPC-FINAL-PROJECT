import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Calendar, Settings, FileText, FileSpreadsheet, Search } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const doctors = [
  {
    name: "Dr. Emily Carter",
    specialization: "Dermatology",
    status: "Available",
    img: "https://randomuser.me/api/portraits/women/2.jpg",  // Updated image
    clockIn: "08:30 AM",
    clockOut: "05:30 PM",
    patientsSeen: "15",
    breaks: "1h 00m",
    overtime: "0h 30m",
    total: "09h 30m"
  },
  {
    name: "Dr. Marcus Reed",
    specialization: "Orthopedics",
    status: "On Leave",
    img: "https://randomuser.me/api/portraits/men/3.jpg",  // Updated image
  },
  {
    name: "Dr. Alan Kim",
    specialization: "Neurosurgery",
    status: "Available",
    img: "https://randomuser.me/api/portraits/men/13.jpg",  // Updated image
    clockIn: "09:00 AM",
    clockOut: "06:00 PM",
    patientsSeen: "18",
    breaks: "1h 15m",
    overtime: "0h 45m",
    total: "09h 45m"
  },
  {
    name: "Dr. Natalie Brooks",
    specialization: "Cardiology",
    status: "Available",
    img: "https://randomuser.me/api/portraits/women/12.jpg",  // Updated image
    clockIn: "08:45 AM",
    clockOut: "05:45 PM",
    patientsSeen: "12",
    breaks: "1h 00m",
    overtime: "0h 20m",
    total: "09h 20m"
  },
  // Add more doctor entries as needed
];


export default function DoctorAttendance() {
  const [search, setSearch] = useState("");

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Doctor Attendance</h2>
          <p className="text-gray-500 text-sm">Manage your doctor's attendance and schedule</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline"><FileText className="w-5 h-5" /></Button>
          <Button variant="outline"><FileSpreadsheet className="w-5 h-5" /></Button>
        </div>
        <Card className="col-span-2 p-4">
          <CardContent>
            <h2 className="text-lg font-semibold">Days Overview This Month</h2>
            <div className="grid grid-cols-6 gap-4 mt-4">
              {[
                { count: 31, label: "Total Working Days", color: "bg-orange-100" },
                { count: 5, label: "Absent Days", color: "bg-red-100" },
                { count: 28, label: "Present Days", color: "bg-purple-100" },
                { count: 2, label: "Half Days", color: "bg-yellow-100" },
                { count: 1, label: "Late Days", color: "bg-blue-100" },
                { count: 2, label: "Holidays", color: "bg-green-100" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`p-4 rounded-md ${item.color}`}>
                    <p className="text-xl font-bold">{item.count}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
          <Input
            placeholder="Search by Doctor Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Calendar className="w-5 h-5" /> Select Date</Button>
          <Button variant="outline">Select Status</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Patients Seen</TableHead>
            <TableHead>Breaks</TableHead>
            <TableHead>Overtime</TableHead>
            <TableHead>Total Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.filter(doctor => doctor.name.toLowerCase().includes(search.toLowerCase())).map((doctor, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={doctor.img} alt={doctor.name} />
                </Avatar>
                <div>
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-white ${doctor.status === "Available" ? "bg-green-500" : "bg-red-500"}`}>
                  {doctor.status}
                </span>
              </TableCell>
              <TableCell>{doctor.clockIn || "-"}</TableCell>
              <TableCell>{doctor.clockOut || "-"}</TableCell>
              <TableCell>{doctor.patientsSeen || "-"}</TableCell>
              <TableCell>{doctor.breaks || "-"}</TableCell>
              <TableCell>{doctor.overtime || "-"}</TableCell>
              <TableCell>{doctor.total || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="fixed bottom-6 right-6 bg-orange-500 p-3 rounded-full cursor-pointer shadow-lg">
        <Settings className="w-6 h-6 text-white" />
      </div>
    </Card>
  );
}

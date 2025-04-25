import { useState } from "react";
import { Calendar, Clock, FileText, FileSpreadsheet, Settings, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export  function Attendanceemployee() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-3">
      {/* Greeting Section */}
      <div className="col-span-3 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center">
          👋 Good Morning, <span className="text-blue-600 ml-1">John Smilga</span>
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText size={18} />
          </Button>
          <Button variant="outline">
            <FileSpreadsheet size={18} />
          </Button>
          <Button variant="outline">
            <Settings size={18} />
          </Button>
        </div>
      </div>
      
      {/* Attendance Section */}
      <Card className="col-span-1 p-4">
        <CardContent>
          <h2 className="text-lg font-semibold">Attendance</h2>
          <p className="text-sm text-gray-500">22 Aug 2023</p>
          <div className="flex items-center gap-2 mt-4">
            <Calendar size={20} className="text-blue-600" />
            <span className="text-2xl font-bold">{currentTime}</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button className="bg-orange-500 text-white">Clock Out</Button>
            <Button variant="outline">Break</Button>
          </div>
        </CardContent>
      </Card>

      {/* Days Overview Section */}
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

      {/* Attendance Table */}
      <Card className="col-span-3 p-4">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <input type="text" placeholder="Search" className="border p-2 rounded w-1/3" />
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Select Status <ChevronDown size={16} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Absent</DropdownMenuItem>
                  <DropdownMenuItem>Present</DropdownMenuItem>
                  <DropdownMenuItem>Holiday</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort By <ChevronDown size={16} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Recently Added</DropdownMenuItem>
                  <DropdownMenuItem>Ascending</DropdownMenuItem>
                  <DropdownMenuItem>Descending</DropdownMenuItem>
                  <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                  <DropdownMenuItem>Last Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                {[
                  "Date", "Status", "Clock In", "Clock Out", "Production", "Break", "Overtime", "Progress", "Total Hours"
                ].map((header) => (
                  <th key={header} className="p-2 text-left text-sm">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[{
                date: "01 Jan 2025", status: "Present", clockIn: "09:15 AM", clockOut: "08:55 PM", 
                production: "9h 00m", break: "1h 13m", overtime: "00h 50m", totalHours: "09h 50m"
              }, {
                date: "02 Jan 2025", status: "Present", clockIn: "09:07 AM", clockOut: "08:40 PM", 
                production: "9h 10m", break: "1h 07m", overtime: "01h 13m", totalHours: "10h 23m"
              }].map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 text-sm">{row.date}</td>
                  <td className="p-2 text-sm"><span className="bg-green-200 text-green-800 px-2 py-1 rounded">{row.status}</span></td>
                  <td className="p-2 text-sm">{row.clockIn}</td>
                  <td className="p-2 text-sm">{row.clockOut}</td>
                  <td className="p-2 text-sm">{row.production}</td>
                  <td className="p-2 text-sm">{row.break}</td>
                  <td className="p-2 text-sm">{row.overtime}</td>
                  <td className="p-2 text-sm">{/* Progress bar placeholder */}</td>
                  <td className="p-2 text-sm">{row.totalHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

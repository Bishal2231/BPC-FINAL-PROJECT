import { useState } from "react";
import { FileText, FileSpreadsheet, Settings, Calendar, ChevronDown, CheckSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function Adminleave() {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-3">
      {/* Heading Section */}
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">Leaves</h1>
        <p className="text-gray-500 text-sm">Manage your Leaves</p>
      </div>
      
      {/* Leave Table */}
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
                  <DropdownMenuItem>Approved</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Rejected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2"><CheckSquare size={16} /></th>
                {[
                  "ID", "Employee", "Type", "From Date", "To Date", "Days/Hours", "Applied On", "Shift"
                ].map((header) => (
                  <th key={header} className="p-2 text-left text-sm">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[{
                id: "EMP001", name: "Carl Evans", role: "Designer", type: "Sick Leave", from: "24 Dec 2024", to: "24 Dec 2024", days: "01 Day", applied: "23 Dec 2024", shift: "Regular"
              }, {
                id: "EMP002", name: "Minerva Rameriz", role: "Administrator", type: "Casual Leave", from: "10 Dec 2024", to: "10 Dec 2024", days: "01 Day", applied: "09 Dec 2024", shift: "Regular"
              }].map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 text-sm"><input type="checkbox" /></td>
                  <td className="p-2 text-sm">{row.id}</td>
                  <td className="p-2 text-sm flex items-center gap-2">
                    <img src="/user-icon.png" alt="User" className="w-6 h-6 rounded-full" />
                    <div>
                      <p className="font-semibold">{row.name}</p>
                      <p className="text-xs text-gray-500">{row.role}</p>
                    </div>
                  </td>
                  <td className="p-2 text-sm">{row.type}</td>
                  <td className="p-2 text-sm">{row.from}</td>
                  <td className="p-2 text-sm">{row.to}</td>
                  <td className="p-2 text-sm">{row.days}</td>
                  <td className="p-2 text-sm">{row.applied}</td>
                  <td className="p-2 text-sm">{row.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const employees = [
    {
        id: "HOS001",
        name: "Anthony Lewis",
        role: "Machine Cleaner",
        department: "Maintenance",
        status: "Paid",
        monthPending: 0,
        image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "HOS002",
        name: "Brian Villalobos",
        role: "Nurse Helper",
        department: "Nursing Assistance",
        status: "Pending",
        monthPending: 2,
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        id: "HOS003",
        name: "Harvey Smith",
        role: "Room Cleaner",
        department: "Housekeeping",
        status: "Paid",
        monthPending: 0,
        image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        id: "HOS004",
        name: "Sophia Martin",
        role: "Dressing Assistant",
        department: "Wound Care",
        status: "Pending",
        monthPending: 1,
        image: "https://randomuser.me/api/portraits/women/10.jpg",
    },
];

const doctors = [
    {
        id: "DOC001",
        name: "Dr. Emily Carter",
        specialization: "Dermatology",
        status: "Paid",
        monthPending: 0,
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        id: "DOC002",
        name: "Dr. Marcus Reed",
        specialization: "Orthopedics",
        status: "Pending",
        monthPending: 3,
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        id: "DOC003",
        name: "Dr. Natalie Brooks",
        specialization: "Cardiology",
        status: "Pending",
        monthPending: 2,
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        id: "DOC004",
        name: "Dr. Alan Kim",
        specialization: "Neurosurgery",
        status: "Paid",
        monthPending: 0,
        image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
];

export default function Payroll() {
    const [isEmployeePayroll, setIsEmployeePayroll] = useState(true);

    return (
        <div className="p-6">
            <div className=" items-center mb-4">
                <h2 className="text-2xl font-semibold">Payroll</h2>
                <div className="flex gap-4 justify-around">
                    <Button onClick={() => setIsEmployeePayroll(true)} variant={isEmployeePayroll ? "default" : "outline"}>
                        Staff Payroll
                    </Button>
                    <Button onClick={() => setIsEmployeePayroll(false)} variant={!isEmployeePayroll ? "default" : "outline"}>
                        Doctor Payroll
                    </Button>
                </div>
            </div>

            {isEmployeePayroll ? (
                <EmployeePayrollTable employees={employees} />
            ) : (
                <DoctorPayrollTable doctors={doctors} />
            )}
        </div>
    );
}

function EmployeePayrollTable({ employees }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Months Pending</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employees.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={employee.image} alt={employee.name} />
                            </Avatar>
                            <div>
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-gray-500 text-sm">{employee.role}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded text-white ${employee.status === "Paid" ? "bg-green-500" : "bg-red-500"}`}>
                                {employee.status}
                            </span>
                        </TableCell>
                        <TableCell>{employee.status === "Pending" ? `${employee.monthPending} Month(s)` : "N/A"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function DoctorPayrollTable({ doctors }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Months Pending</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                        <TableCell className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={doctor.image} alt={doctor.name} />
                            </Avatar>
                            <div>
                                <p className="font-medium">{doctor.name}</p>
                                <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded text-white ${doctor.status === "Paid" ? "bg-green-500" : "bg-red-500"}`}>
                                {doctor.status}
                            </span>
                        </TableCell>
                        <TableCell>{doctor.status === "Pending" ? `${doctor.monthPending} Month(s)` : "N/A"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

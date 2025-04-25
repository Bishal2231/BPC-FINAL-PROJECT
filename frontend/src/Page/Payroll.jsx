import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function Payroll() {
    const [isEmployeePayroll, setIsEmployeePayroll] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get("http://localhost:7180/employee/getallemployee");
                setEmployees(res.data.employees);
            } catch (err) {
                console.error("Error fetching employees:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const staff = employees.filter(emp => emp.type === "staff");
    const doctors = employees.filter(emp => emp.type === "doctor");

    return (
        <div className="p-6">
            <div className="items-center mb-4">
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

            {loading ? (
                <p>Loading...</p>
            ) : isEmployeePayroll ? (
                <EmployeePayrollTable employees={staff} />
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
                    <TableHead>Pay</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {employees.map((employee) => (
                    <TableRow key={employee._id}>
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
                            <span className={`px-2 py-1 rounded text-white ${employee.paid === "Paid" ? "bg-green-500" : "bg-red-500"}`}>
                                {employee.paid}
                            </span>
                        </TableCell>
                        <TableCell>
                            {employee.paid === "Pending" && employee.pendingSalary !== null
                                ? `${employee.pendingSalary} Month(s)`
                                : "N/A"}
                        </TableCell>
                        <TableCell>
                            <Link to=""> Pay Now</Link>
                        </TableCell>
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
                    <TableRow key={doctor._id}>
                        <TableCell className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={doctor.image} alt={doctor.name} />
                            </Avatar>
                            <div>
                                <p className="font-medium">{doctor.name}</p>
                                <p className="text-gray-500 text-sm">{doctor.department}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded text-white ${doctor.paid === "Paid" ? "bg-green-500" : "bg-red-500"}`}>
                                {doctor.paid}
                            </span>
                        </TableCell>
                        <TableCell>
                            {doctor.paid === "Pending" && doctor.pendingSalary !== null
                                ? `${doctor.pendingSalary} Month(s)`
                                : "N/A"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

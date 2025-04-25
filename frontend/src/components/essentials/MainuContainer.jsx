import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBullseye,
  FaUserTie,
  FaExchangeAlt,
  FaUserClock,
  FaCalendarAlt,
  FaCalendarDay,
  FaFileInvoiceDollar
} from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

const MainuContainer = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [leaveTypeList, SetleaveTypeList] = useState(false)
  const [AttendenceTypeList, setAttendenceTypeList]=useState(false)
  const openLeaveTypes = () => {
    SetleaveTypeList(!leaveTypeList)
    console.log("working")

  }
  const openAttendenceTypes = () => {
    setAttendenceTypeList(!AttendenceTypeList)
    console.log("working")

  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (leaveTypeList) {
      SetleaveTypeList(false)
    }
    if (AttendenceTypeList) { 
      setAttendenceTypeList(false)
    }
  };

  return (
    <div className={`h-screen bg-white transition-all duration-500 ease-in-out overflow-hidden relative   border
      ${isCollapsed ? "w-[5rem]" : "w-[14vw] pl-6 pr-6"}`}>

      {/* Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="absolute top-[-3] right-0 p-2 mb-7 rounded-md hover:bg-gray-100 transition-colors"
      >
        <FiMenu className="text-gray-600 text-xl" />
      </button>

      <div className="mt-10">
        {/* {!isCollapsed && <h5 className="text-lg font-semibold">HRM</h5>} */}

        <div className="h-[50vh] mt-4 ml-2 flex flex-col gap-4">
          {/* Employees */}
          <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <FaUsers className="text-gray-600" size="0.8rem" />
            {!isCollapsed && (
              <>
                <h6 className="text-sm"> <Link to='/' style={{ textDecoration: 'none' }} className="text-black">Employees</Link>  </h6>
          
              </>
            )}
          </div>

          <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <FaUserTie className="text-gray-600" size="0.8rem" />
            {!isCollapsed && <h6 className="text-sm"> <Link to='/department' style={{ textDecoration: 'none' }} className="text-black"> Department </Link></h6>}
          </div>
          {/* Appointment */}
          <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <FaUserTie className="text-gray-600" size="0.8rem" />
            {!isCollapsed && <h6 className="text-sm"> <Link to='/appointment' style={{ textDecoration: 'none' }} className="text-black" > Appointment </Link></h6>}
          </div>



          {/* Shifts */}
          <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <FaExchangeAlt className="text-gray-600" size="0.8rem" />
            {!isCollapsed && <h6 className="text-sm"> <Link to="/shifts" style={{ textDecoration: 'none' }} className="text-black"> Shifts </Link> </h6>}
          </div>

          {/* Attendence */}
          <div className={`flex gap-2     p-2 hover:bg-gray-100 rounded-md cursor-pointer ${AttendenceTypeList ? `flex-col` : ``}`}>
            <div className="flex flex-row gap-2 items-center ">

            <FaUserClock className="text-gray-600 " size="0.8rem" />
              {!isCollapsed && <h6 className="text-sm flex items-center gap-2" onClick={openAttendenceTypes}>  Attendence <IoIosArrowDropdown/></h6>}
            </div>

            {AttendenceTypeList &&
              <div className="text-sm text-nowrap gap-2">
                <li > <Link to="/attendancedoctor" style={{ textDecoration: 'none' }} className="text-black"> Doctor attendence</Link> </li>
                <li><Link to="/attendanceemployee" style={{ textDecoration: 'none' }} className="text-black"> Staff attendence</Link> </li>
                </div>
              }
          </div>

         
          
         

     

          {/* Payroll */}
          <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <FaFileInvoiceDollar className="text-gray-600" size="0.8rem" />
            {!isCollapsed && <Link to="/payroll" style={{ textDecoration: 'none' }} className=" text-black "> Payroll</Link>}
          </div>

          {/* medicine */}
          <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <FaFileInvoiceDollar className="text-gray-600" size="0.8rem" />
            {!isCollapsed && <Link to="/medicine" style={{ textDecoration: 'none' }} className="text-black"> medicine</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainuContainer;
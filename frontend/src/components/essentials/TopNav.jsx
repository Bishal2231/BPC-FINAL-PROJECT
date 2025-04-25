import React from "react";
import Dropdown from "./DropDown";
import { userAuthStore } from "../../authstore/Authstore";
import {
  FaBriefcase,
  FaSearch,
  FaPlus,
  FaShoppingBag,
  FaMagic,
  FaEnvelope,
  FaBell,
  FaCog,
  FaUser
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TopNav = () => {
  const { user } = userAuthStore()
  if (user) {
    console.log("user exits", user)
  } else {
    console.log("no user")
  }
  return (
    <div className="w-full flex items-center bg-white justify-between px-4 py-3 border-b border-gray-200">
      {/* Left Section */}
      <div className="flex w-[40%] justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex gap-2 items-center">
          <FaBriefcase className="text-orange-500 text-2xl" />
          <div>
            <h6 className="text-xs">HRM</h6>
            <h2 className="text-xl font-bold">HPMS</h2>
          </div>
        </div>

        {/* Search Bar */}
        <div className="border border-black h-9 w-[49%] rounded-l-md flex items-center gap-2 px-2 opacity-50">
          <FaSearch className="text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="search"
            className="outline-none w-full bg-transparent"
          />
          <div className="bg-blue-100 w-8 rounded text-xs h-6 flex items-center justify-center">
            ⌘ K
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 w-[45%] justify-end">
        {/* <Dropdown /> */}

        {/* <button className="flex items-center gap-2 bg-orange-500 px-3 py-1 rounded-md text-white text-sm">
          <FaPlus className="text-xs" />
          Add new
        </button> */}

        {/* <button className="flex items-center gap-2 bg-blue-800 px-3 py-1 rounded-md text-white text-sm">
          <FaShoppingBag className="text-xs" />
          pos
        </button> */}

        {/* Icon Buttons */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 flex items-center justify-center rounded-md">
            <FaMagic className="text-gray-600 text-sm" />
          </div>

          <div className="h-8 w-8 bg-gray-200 flex items-center justify-center rounded-md">
            <FaEnvelope className="text-gray-600 text-sm" />
          </div>

          <div className="h-8 w-8 bg-gray-200 flex items-center justify-center rounded-md">
            <FaBell className="text-gray-600 text-sm" />
          </div>

          <div className="h-8 w-8 bg-gray-200 flex items-center justify-center rounded-md">
            <FaCog className="text-gray-600 text-sm" />
          </div>

          <div className="h-8 w-8 bg-gray-200 flex items-center justify-center rounded-md">
            <Link to="/user">
              <FaUser className="text-gray-600 text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
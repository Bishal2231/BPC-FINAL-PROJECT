import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const DropdownWithImages = () => {
  const options = [
    { label: "Freshmart", value: "freshmart", img: "https://via.placeholder.com/30?text=F" },
    { label: "Apple", value: "apple", img: "https://via.placeholder.com/30?text=A" },
    { label: "Banana", value: "banana", img: "https://via.placeholder.com/30?text=B" }
  ];

  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false); // Close dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  return (
    <div className="flex flex-col items-center gap-1" style={{ position: 'relative' }}>
      <Card className="p-1 w-24 shadow-sm">
        <CardContent>
          {/* Button to toggle dropdown */}
          <Button
            className="w-full flex items-center gap-1 px-1 py-1 border rounded-md bg-white hover:bg-gray-100"
            onClick={toggleDropdown}
            style={{ height: '1.5rem' }}
          >
            <img src={selected.img} alt={selected.label} className="w-4 h-4 rounded-full" />
            <span className="text-xs font-medium text-gray-800">{selected.label}</span>
            <ChevronDown className="ml-auto text-gray-500 w-3 h-3" />
          </Button>

          {/* Dropdown options */}
          {isOpen && (
            <div
              className="absolute mt-1 space-y-1 border rounded-md bg-white shadow-md"
              style={{ top: '100%', left: 0, zIndex: 10, width: '100%' }}
            >
              {options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="w-full flex items-center gap-1 p-1 hover:bg-gray-100 text-xs"
                >
                  <img src={option.img} alt={option.label} className="w-4 h-4 rounded-full" />
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DropdownWithImages;

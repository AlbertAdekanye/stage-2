// components/FilterDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

// Available filter options for invoice status
const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
];

const FilterDropdown = ({ selectedStatuses, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Reference for detecting outside clicks
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle selection of a status filter
  const handleToggle = (value) => {
    if (selectedStatuses.includes(value)) {
      onChange(selectedStatuses.filter((s) => s !== value));
    } else {
      onChange([...selectedStatuses, value]);
    }
  };

  // Dynamic label shown on dropdown button
  const getFilterLabel = () => {
    if (selectedStatuses.length === 0) return 'Filter by status';
    if (selectedStatuses.length === 3) return 'All statuses';
    return `${selectedStatuses.length} selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Dropdown toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg duration-200 text-sm font-medium"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Filter icon (currently commented out in UI) */}
        {/* <Filter size={16} /> */}

        {/* Current filter label */}
        <span>{getFilterLabel()}</span>

        {/* Dropdown arrow with rotation animation */}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">

          <div className="p-2" role="listbox">

            {/* Section header */}
            <div className="px-3 py-2 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 mb-1">
              Status
            </div>

            {/* Filter options */}
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
              >

                {/* Checkbox for each status */}
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                />

                {/* Label text */}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
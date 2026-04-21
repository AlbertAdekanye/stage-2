// components/Header.jsx
import React from 'react';
import FilterDropdown from './FilterDropdown';
import { Bell, Menu, Plus } from 'lucide-react';

const Header = ({ onCreateNew, filterStatus, setFilterStatus }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Page Title (visible on mobile when sidebar is hidden) */}
          <div className="lg:hidden">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Invoices</h1>
          </div>
          
          {/* Right side - Filter, Notifications, and New Invoice button */}
          <div className="flex items-center gap-3 ml-auto">
            <FilterDropdown selectedStatuses={filterStatus} onChange={setFilterStatus} />
            
            {/* <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button> */}
            
            <button
              onClick={onCreateNew}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-sm"
            >
              <Plus size={20} className='rounded-full text-blue-700 bg-white' />
              <span className="font-medium">New Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;




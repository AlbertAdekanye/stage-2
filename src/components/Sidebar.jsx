// components/Sidebar.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  console.log('Sidebar rendered, current theme:', theme);

  // Dynamic inline style for sidebar background
  const sidebarBgColor = theme === 'light' ? '#373B53' : '#1E2139';

  return (
    <aside
      style={{ backgroundColor: sidebarBgColor }}
      className="
        transition-colors duration-200
        w-full h-[72px] flex items-center justify-between px-6
        lg:w-[90px] lg:h-auto lg:flex-col lg:justify-between lg:items-center lg:py-6 lg:px-0 lg:rounded-r-3xl
      "
    >
      {/* LOGO */}
      <div className="flex items-center justify-center lg:w-full">
        <img src="/logo.png" alt="logo" className="w-10 h-10" />
      </div>

      {/* RIGHT / BOTTOM */}
      <div className="flex items-center gap-4 lg:flex-col lg:gap-6">

        {/* THEME TOGGLE BUTTON */}
        <button
          onClick={() => {
            console.log('Theme button clicked');
            toggleTheme();
          }}
          className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* AVATAR */}
        <img
          src="/avatar.png"
          alt="avatar"
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/20 hover:border-white/50 transition-all cursor-pointer"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
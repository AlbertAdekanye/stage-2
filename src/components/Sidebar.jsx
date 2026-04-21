// import React from 'react';
// import { useTheme } from '../context/ThemeContext';

// const Sidebar = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <aside
//       className="
//         bg-[#373B53] dark:bg-[#1E2139]
//         transition-colors duration-200

//         w-full h-[72px] flex items-center justify-between px-6

//         lg:w-[90px] lg:h-auto lg:flex-col lg:justify-between lg:items-center lg:py-6 lg:px-0 lg:rounded-r-3xl
//       "
//     >
//       {/* LOGO */}
//       <div className="flex items-center justify-center lg:w-full">
//         <img src="/logo.png" alt="logo" className="w-10 h-10" />
//       </div>

//       {/* RIGHT / BOTTOM */}
//       <div className="flex items-center gap-4 lg:flex-col lg:gap-6">

//         {/* THEME */}
//         <button
//           onClick={toggleTheme}
//           className="text-white/70 hover:text-white transition text-xl"
//         >
//           {theme === 'light' ? '🌙' : '☀️'}
//         </button>

//         {/* AVATAR */}
//         <img
//           src="/avatar.png"
//           alt="avatar"
//           className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/20"
//         />
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
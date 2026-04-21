// // components/InvoiceList.jsx
// import React, { useState } from 'react';
// import { useInvoices } from '../context/InvoiceContext';
// import StatusBadge from './StatusBadge';
// import { Edit2, Trash2, Eye, ChevronRight } from 'lucide-react';

// const InvoiceList = ({ onEdit, onDelete, onView, filterStatus }) => {
//   const { invoices } = useInvoices();
//   const [hoveredId, setHoveredId] = useState(null);
  
//   const filteredInvoices = filterStatus.length === 0 
//     ? invoices 
//     : invoices.filter(inv => filterStatus.includes(inv.status));

//   const emptyState = filteredInvoices.length === 0;

//   // Format currency to GBP
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-GB', {
//       style: 'currency',
//       currency: 'GBP',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(amount);
//   };

//   return (
//     <div className="max-w-5xl mx-auto">
//       {/* Header with invoice count only - filter is now in main header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Invoices</h1>
//         <p className="text-gray-500 dark:text-gray-400 mt-1">
//           There {filteredInvoices.length === 1 ? 'is' : 'are'} {filteredInvoices.length} total {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}
//         </p>
//       </div>

//       {/* Invoice List - Desktop Table View */}
//       {emptyState ? (
//         <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
//           <div className="text-6xl mb-4">📄</div>
//           <p className="text-gray-500 dark:text-gray-400 text-lg">No invoices found</p>
//           <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try changing your filters</p>
//         </div>
//       ) : (
//         <div className="hidden md:block">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
//             {/* Table Header */}
//             <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
//               <div className="col-span-2">Invoice ID</div>
//               <div className="col-span-3">Due Date</div>
//               <div className="col-span-3">Client Name</div>
//               <div className="col-span-2 text-right">Amount</div>
//               <div className="col-span-1">Status</div>
//               <div className="col-span-1"></div>
//             </div>

//             {/* Table Rows */}
//             {filteredInvoices.map((invoice) => (
//               <div
//                 key={invoice.id}
//                 className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group`}
//                 onClick={() => onView(invoice)}
//                 onMouseEnter={() => setHoveredId(invoice.id)}
//                 onMouseLeave={() => setHoveredId(null)}
//               >
//                 {/* Invoice ID */}
//                 <div className="col-span-2">
//                   <span className="font-bold text-gray-900 dark:text-white">
//                     #{invoice.id}
//                   </span>
//                 </div>
                
//                 {/* Due Date */}
//                 <div className="col-span-3 text-gray-600 dark:text-gray-400">
//                   Due {new Date(invoice.paymentDue).toLocaleDateString('en-GB', {
//                     day: 'numeric',
//                     month: 'short',
//                     year: 'numeric'
//                   })}
//                 </div>
                
//                 {/* Client Name */}
//                 <div className="col-span-3 text-gray-700 dark:text-gray-300">
//                   {invoice.clientName}
//                 </div>
                
//                 {/* Amount */}
//                 <div className="col-span-2 text-right">
//                   <span className="font-bold text-gray-900 dark:text-white">
//                     {formatCurrency(invoice.total)}
//                   </span>
//                 </div>
                
//                 {/* Status */}
//                 <div className="col-span-1">
//                   <StatusBadge status={invoice.status} />
//                 </div>
                
//                 {/* Actions / Chevron */}
//                 <div className="col-span-1 flex justify-end items-center gap-2">
//                   <div 
//                     className={`flex gap-1 transition-opacity duration-200 ${hoveredId === invoice.id ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <button
//                       onClick={() => onView(invoice)}
//                       className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
//                       aria-label="View invoice"
//                     >
//                       <Eye size={16} />
//                     </button>
//                     <button
//                       onClick={() => onEdit(invoice)}
//                       className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
//                       aria-label="Edit invoice"
//                     >
//                       <Edit2 size={16} />
//                     </button>
//                     <button
//                       onClick={() => onDelete(invoice)}
//                       className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
//                       aria-label="Delete invoice"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                   <ChevronRight 
//                     size={18} 
//                     className={`text-gray-400 transition-all duration-200 ${hoveredId === invoice.id ? 'translate-x-0.5 text-indigo-500' : ''}`}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Mobile Card View */}
//       <div className="md:hidden space-y-4">
//         {filteredInvoices.map((invoice) => (
//           <div
//             key={invoice.id}
//             className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-all duration-200"
//             onClick={() => onView(invoice)}
//           >
//             <div className="flex justify-between items-start mb-3">
//               <span className="font-bold text-gray-900 dark:text-white text-lg">#{invoice.id}</span>
//               <StatusBadge status={invoice.status} />
//             </div>
            
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500 dark:text-gray-400">Client:</span>
//                 <span className="text-gray-700 dark:text-gray-300 font-medium">{invoice.clientName}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500 dark:text-gray-400">Due Date:</span>
//                 <span className="text-gray-600 dark:text-gray-400">
//                   {new Date(invoice.paymentDue).toLocaleDateString('en-GB', {
//                     day: 'numeric',
//                     month: 'short',
//                     year: 'numeric'
//                   })}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
//                 <span className="text-gray-900 dark:text-white font-bold text-xl">
//                   {formatCurrency(invoice.total)}
//                 </span>
//                 <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
//                   <button
//                     onClick={() => onEdit(invoice)}
//                     className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
//                     aria-label="Edit"
//                   >
//                     <Edit2 size={18} />
//                   </button>
//                   <button
//                     onClick={() => onDelete(invoice)}
//                     className="p-2 text-gray-500 hover:text-red-600 transition-colors"
//                     aria-label="Delete"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InvoiceList;
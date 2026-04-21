// // components/DeleteModal.jsx
// import React, { useEffect, useRef } from 'react';
// import { useInvoices } from '../context/InvoiceContext';

// const DeleteModal = ({ invoice, onConfirm, onCancel }) => {
//   const { deleteInvoice } = useInvoices();
//   const modalRef = useRef(null);
//   const confirmButtonRef = useRef(null);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') onCancel();
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     confirmButtonRef.current?.focus();
    
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [onCancel]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onCancel();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [onCancel]);

//   const handleDelete = async () => {
//     await deleteInvoice(invoice.id);
//     onConfirm();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//       <div
//         ref={modalRef}
//         className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="modal-title"
//       >
//         <h2 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//           Confirm Deletion
//         </h2>
//         <p className="text-gray-500 dark:text-gray-400 mb-6">
//           Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
//         </p>
        
//         <div className="flex gap-3 justify-end">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             ref={confirmButtonRef}
//             onClick={handleDelete}
//             className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteModal;
// components/InvoiceDetail.jsx
import React from 'react';
import { useInvoices } from '../context/InvoiceContext';
import StatusBadge from './StatusBadge';
import { ArrowLeft, Edit2, Trash2, CheckCircle} from 'lucide-react';

const InvoiceDetail = ({ invoice, onBack, onEdit, onDelete }) => {
  const { markAsPaid } = useInvoices();

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Go back</span>
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">Status</span>
            <div className="mt-1">
              <StatusBadge status={invoice.status} />
            </div>
          </div>
          
          <div className="flex gap-3">
            {/* edit btn */}
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors bg-gray-700"
            >
              <Edit2 size={16} />
              Edit
            </button>
            {/* delete btn */}
            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-4 py-2 border bg-red-600 dark:border-red-700 text-white dark:text-white rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>

            {/* mark btn */}
            {invoice.status === 'pending' && (
              <button
                onClick={() => markAsPaid(invoice.id)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                <CheckCircle size={16} />
                Mark as Paid
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* invoice details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">#{invoice.id}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{invoice.description}</p>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Invoice Date</h3>
            <p className="text-gray-900 dark:text-white">{new Date(invoice.createdAt).toLocaleDateString()}</p>
            
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4 mb-2">Payment Due</h3>
            <p className="text-gray-900 dark:text-white">{new Date(invoice.paymentDue).toLocaleDateString()}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Bill To</h3>
            <p className="text-gray-900 dark:text-white font-medium">{invoice.clientName}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{invoice.clientEmail}</p>
            <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Sent to</h3>
            <p className="text-gray-900 dark:text-white">{invoice.clientEmail}</p>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="hidden sm:grid sm:grid-cols-4 gap-4 mb-4 text-sm font-medium text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700">
              <div>Item Name</div>
              <div className="text-center">Qty</div>
              <div className="text-right">Price</div>
              <div className="text-right">Total</div>
            </div>
            
            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                <div className="text-gray-500 dark:text-gray-400 sm:text-center">{item.quantity}</div>
                <div className="text-gray-500 dark:text-gray-400 sm:text-right">£{item.price.toFixed(2)}</div>
                <div className="text-right text-gray-900 dark:text-white font-medium">£{item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount Due</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">£{invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
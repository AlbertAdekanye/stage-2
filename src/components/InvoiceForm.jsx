// components/InvoiceForm.jsx
import React, { useState, useEffect } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import { X, Plus, Trash2 } from 'lucide-react';

const initialFormData = {
  senderAddress: { street: '', city: '', postCode: '', country: '' },
  clientName: '',
  clientEmail: '',
  clientAddress: { street: '', city: '', postCode: '', country: '' },
  createdAt: new Date().toISOString().split('T')[0],
  paymentTerms: 30,
  description: '',
  items: [{ id: crypto.randomUUID(), name: '', quantity: 1, price: 0, total: 0 }],
};

const InvoiceForm = ({ onClose, editingInvoice }) => {
  const { addInvoice, updateInvoice } = useInvoices();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingInvoice) {
      setFormData({
        senderAddress: editingInvoice.senderAddress,
        clientName: editingInvoice.clientName,
        clientEmail: editingInvoice.clientEmail,
        clientAddress: editingInvoice.clientAddress,
        createdAt: editingInvoice.createdAt.split('T')[0],
        paymentTerms: editingInvoice.paymentTerms,
        description: editingInvoice.description,
        items: editingInvoice.items.map(item => ({ ...item, id: item.id || crypto.randomUUID() })),
      });
    }
  }, [editingInvoice]);

  const calculateItemTotal = (quantity, price) => quantity * price;

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    const item = { ...newItems[index] };
    
    if (field === 'quantity') item.quantity = Number(value);
    else if (field === 'price') item.price = Number(value);
    else if (field === 'name') item.name = value;
    
    item.total = calculateItemTotal(item.quantity, item.price);
    newItems[index] = item;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: crypto.randomUUID(), name: '', quantity: 1, price: 0, total: 0 }],
    });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.clientEmail.trim()) newErrors.clientEmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) newErrors.clientEmail = 'Invalid email format';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.senderAddress.street.trim()) newErrors.senderStreet = 'Street is required';
    if (!formData.clientAddress.street.trim()) newErrors.clientStreet = 'Street is required';
    
    const hasValidItem = formData.items.some(item => item.name.trim() && item.quantity > 0 && item.price > 0);
    if (!hasValidItem) newErrors.items = 'At least one valid item is required';
    
    for (let i = 0; i < formData.items.length; i++) {
      const item = formData.items[i];
      if (item.name.trim() && (item.quantity <= 0 || item.price <= 0)) {
        newErrors[`item_${i}`] = 'Quantity and price must be positive numbers';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    
    if (status === 'pending' && !validateForm()) return;
    
    setIsSubmitting(true);
    
    const total = formData.items.reduce((sum, item) => sum + item.total, 0);
    const paymentDue = new Date(formData.createdAt);
    paymentDue.setDate(paymentDue.getDate() + formData.paymentTerms);
    
    const invoiceData = {
      ...formData,
      status,
      total,
      paymentDue: paymentDue.toISOString(),
      items: formData.items.filter(item => item.name.trim()),
    };
    
    try {
      if (editingInvoice) {
        await updateInvoice(editingInvoice.id, invoiceData);
      } else {
        await addInvoice(invoiceData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save invoice:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-start ">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl h-full overflow-y-auto shadow-xl rounded-r-4xl">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {editingInvoice ? 'Edit Invoice' : 'New Invoice'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <form className="p-6 space-y-6">
          <div>
            {/* <h3 className='text-indigo-400 font-medium'>Bill From</h3> */}
            <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">Bill From</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street</label>
                <input
                  type="text"
                  value={formData.senderAddress.street}
                  onChange={e => setFormData({ ...formData, senderAddress: { ...formData.senderAddress, street: e.target.value } })}
                  className={`w-full px-3 py-2 border ${errors.senderStreet ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.senderStreet && <p className="text-red-500 text-xs mt-1">{errors.senderStreet}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input type="text" value={formData.senderAddress.city} onChange={e => setFormData({ ...formData, senderAddress: { ...formData.senderAddress, city: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Post Code</label>
                  <input type="text" value={formData.senderAddress.postCode} onChange={e => setFormData({ ...formData, senderAddress: { ...formData.senderAddress, postCode: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                <input type="text" value={formData.senderAddress.country} onChange={e => setFormData({ ...formData, senderAddress: { ...formData.senderAddress, country: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">Bill To</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name *</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                  className={`w-full px-3 py-2 border ${errors.clientName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md dark:bg-gray-700 dark:text-white`}
                />
                {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Email *</label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={e => setFormData({ ...formData, clientEmail: e.target.value })}
                  className={`w-full px-3 py-2 border ${errors.clientEmail ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md dark:bg-gray-700 dark:text-white`}
                />
                {errors.clientEmail && <p className="text-red-500 text-xs mt-1">{errors.clientEmail}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street</label>
                <input
                  type="text"
                  value={formData.clientAddress.street}
                  onChange={e => setFormData({ ...formData, clientAddress: { ...formData.clientAddress, street: e.target.value } })}
                  className={`w-full px-3 py-2 border ${errors.clientStreet ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md dark:bg-gray-700 dark:text-white`}
                />
                {errors.clientStreet && <p className="text-red-500 text-xs mt-1">{errors.clientStreet}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input type="text" value={formData.clientAddress.city} onChange={e => setFormData({ ...formData, clientAddress: { ...formData.clientAddress, city: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Post Code</label>
                  <input type="text" value={formData.clientAddress.postCode} onChange={e => setFormData({ ...formData, clientAddress: { ...formData.clientAddress, postCode: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                <input type="text" value={formData.clientAddress.country} onChange={e => setFormData({ ...formData, clientAddress: { ...formData.clientAddress, country: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Invoice Date</label>
              <input type="date" value={formData.createdAt} onChange={e => setFormData({ ...formData, createdAt: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Terms</label>
              <select value={formData.paymentTerms} onChange={e => setFormData({ ...formData, paymentTerms: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                <option value={1}>Net 1 Day</option>
                <option value={7}>Net 7 Days</option>
                <option value={14}>Net 14 Days</option>
                <option value={30}>Net 30 Days</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Description *</label>
            <input
              type="text"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md dark:bg-gray-700 dark:text-white`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Item List</h3>
            {errors.items && <p className="text-red-500 text-sm mb-3">{errors.items}</p>}
            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={item.name}
                      onChange={e => updateItem(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={e => updateItem(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                      min="1"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={e => updateItem(index, 'price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="w-20 text-right text-sm text-gray-700 dark:text-gray-300 pt-2">
                    ${item.total.toFixed(2)}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    disabled={formData.items.length === 1}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-4 w-full py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
            >
              <Plus size={16} className="inline mr-1" /> Add Item
            </button>
          </div>
          
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 pb-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'pending')}
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {editingInvoice ? 'Update Invoice' : 'Save & Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
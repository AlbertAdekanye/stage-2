// context/InvoiceContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { openDB } from 'idb';

let dbPromise = null;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB('InvoiceAppDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('invoices')) {
          db.createObjectStore('invoices', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
};

const InvoiceContext = createContext(undefined);

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const db = await getDB();
      const allInvoices = await db.getAll('invoices');
      setInvoices(allInvoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Failed to load invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async (invoiceData) => {
    const newInvoice = {
      ...invoiceData,
      id: `INV-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    const db = await getDB();
    await db.add('invoices', newInvoice);
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const updateInvoice = async (id, updates) => {
    const db = await getDB();
    const existing = await db.get('invoices', id);
    if (existing) {
      const updated = { ...existing, ...updates };
      await db.put('invoices', updated);
      setInvoices(prev => prev.map(inv => inv.id === id ? updated : inv));
    }
  };

  const deleteInvoice = async (id) => {
    const db = await getDB();
    await db.delete('invoices', id);
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const markAsPaid = async (id) => {
    await updateInvoice(id, { status: 'paid' });
  };

  const getInvoice = async (id) => {
    const db = await getDB();
    return db.get('invoices', id);
  };

  return (
    <InvoiceContext.Provider value={{
      invoices,
      loading,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      markAsPaid,
      getInvoice,
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};
// context/InvoiceContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { openDB } from 'idb';

// Singleton promise to avoid reopening IndexedDB multiple times
let dbPromise = null;

// Initializes and returns IndexedDB instance
const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB('InvoiceAppDB', 1, {
      upgrade(db) {
        // Create invoices store if it doesn't exist
        if (!db.objectStoreNames.contains('invoices')) {
          db.createObjectStore('invoices', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
};

// Create context for invoice state management
const InvoiceContext = createContext(undefined);

// Custom hook to consume invoice context safely
export const useInvoices = () => {
  const context = useContext(InvoiceContext);

  // Prevent usage outside provider
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};

// Provider that wraps the app and manages invoice state
export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]); // stored invoices list
  const [loading, setLoading] = useState(true); // loading state for initial fetch

  // Load invoices once when component mounts
  useEffect(() => {
    loadInvoices();
  }, []);

  // Fetch all invoices from IndexedDB
  const loadInvoices = async () => {
    try {
      const db = await getDB();
      const allInvoices = await db.getAll('invoices');

      // Sort invoices by newest first
      setInvoices(
        allInvoices.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (error) {
      console.error('Failed to load invoices:', error);
    } finally {
      setLoading(false); // stop loading state regardless of success/failure
    }
  };

  // Add a new invoice to database and state
  const addInvoice = async (invoiceData) => {
    const newInvoice = {
      ...invoiceData,
      id: `INV-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, // unique ID
    };

    const db = await getDB();
    await db.add('invoices', newInvoice);

    // Update local state immediately
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  // Update existing invoice by merging new changes
  const updateInvoice = async (id, updates) => {
    const db = await getDB();
    const existing = await db.get('invoices', id);

    if (existing) {
      const updated = { ...existing, ...updates };

      await db.put('invoices', updated);

      // Update state with modified invoice
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === id ? updated : inv))
      );
    }
  };

  // Delete invoice from database and state
  const deleteInvoice = async (id) => {
    const db = await getDB();
    await db.delete('invoices', id);

    // Remove from local state
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  // Convenience function to mark invoice as paid
  const markAsPaid = async (id) => {
    await updateInvoice(id, { status: 'paid' });
  };

  // Fetch single invoice by ID
  const getInvoice = async (id) => {
    const db = await getDB();
    return db.get('invoices', id);
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        loading,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        markAsPaid,
        getInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
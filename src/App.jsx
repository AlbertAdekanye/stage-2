import React, { useState, useEffect } from 'react';
import { InvoiceProvider, useInvoices } from './context/InvoiceContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm';
import DeleteModal from './components/DeleteModal';

const AppContent = () => {
  const { loading } = useInvoices();

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [deletingInvoice, setDeletingInvoice] = useState(null);
  const [filterStatus, setFilterStatus] = useState([]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowForm(false);
        setEditingInvoice(null);
        setSelectedInvoice(null);
        setDeletingInvoice(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bgLight dark:bg-bgDark flex items-center justify-center">
        <p className="text-gray-500">Loading invoices...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bgLight dark:bg-bgDark transition-colors bg-gray-50 dark:bg-gray-900">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        <Header
          onCreateNew={() => {
            setEditingInvoice(null);
            setShowForm(true);
          }}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">

          {/* LIST */}
          {!showForm && !selectedInvoice && (
            <InvoiceList
              onEdit={(inv) => {
                setEditingInvoice(inv);
                setShowForm(true);
              }}
              onDelete={setDeletingInvoice}
              onView={setSelectedInvoice}
              filterStatus={filterStatus}
            />
          )}

          {/* FORM */}
          {showForm && (
            <InvoiceForm
              onClose={() => {
                setShowForm(false);
                setEditingInvoice(null);
              }}
              editingInvoice={editingInvoice}
            />
          )}

          {/* DETAIL */}
          {selectedInvoice && !showForm && (
            <InvoiceDetail
              invoice={selectedInvoice}
              onBack={() => setSelectedInvoice(null)}
              onEdit={() => {
                setEditingInvoice(selectedInvoice);
                setSelectedInvoice(null);
                setShowForm(true);
              }}
              onDelete={() => {
                setDeletingInvoice(selectedInvoice);
                setSelectedInvoice(null);
              }}
            />
          )}

        </main>
      </div>

      {/* DELETE MODAL */}
      {deletingInvoice && (
        <DeleteModal
          invoice={deletingInvoice}
          onConfirm={() => {
            setDeletingInvoice(null);
          }}
          onCancel={() => setDeletingInvoice(null)}
        />
      )}

    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <AppContent />
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
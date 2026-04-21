// types/invoice.js

// Default structure for a full invoice object (used when fetching or storing invoices)
export const initialInvoice = {
  id: '',
  createdAt: '',
  paymentDue: '',
  description: '',
  paymentTerms: 30,
  clientName: '',
  clientEmail: '',
  status: 'pending',

  // Sender (company/user creating invoice) address details
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },

  // Client (recipient) address details
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },

  // List of invoice items (services/products)
  items: [],

  // Total calculated amount of invoice
  total: 0,
};

// Default structure for invoice form state (used when creating/editing invoice)
export const initialFormData = {

  // Sender address form fields
  senderAddress: { street: '', city: '', postCode: '', country: '' },

  // Client details
  clientName: '',
  clientEmail: '',

  // Client address form fields
  clientAddress: { street: '', city: '', postCode: '', country: '' },

  // Invoice creation date (defaults to today)
  createdAt: new Date().toISOString().split('T')[0],

  // Payment terms in days (e.g. 30 days)
  paymentTerms: 30,

  // Description of the invoice / project
  description: '',

  // Items added in the invoice form (starts empty)
  items: [],
};
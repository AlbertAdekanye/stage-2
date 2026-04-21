# Invoice Management App

A fully functional, responsive invoice management application built with React, Tailwind CSS, and IndexedDB. Create, read, update, and delete invoices with form validation, dark mode support, and persistent data storage.

## Live Demo

[View Live Demo](#) *(Add your Vercel/Netlify URL here)*

## Features

### Core Features
- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete invoices
- ✅ **Form Validation** - Client name, email format, and item validation
- ✅ **Status Management** - Draft, Pending, and Paid statuses with proper transitions
- ✅ **Filter by Status** - Multi-select filter for invoice statuses
- ✅ **Dark/Light Mode** - Theme toggle with localStorage persistence
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✅ **Data Persistence** - IndexedDB for reliable offline-capable storage
- ✅ **Accessibility** - Keyboard navigation, focus trapping, and ARIA labels

### Additional Features
- ✅ Collapsible sidebar with user profile
- ✅ Search functionality
- ✅ Real-time filtering
- ✅ Hover states on all interactive elements
- ✅ Confirmation modal before deletion
- ✅ ESC key to close modals and forms

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Styling and responsive design |
| **IndexedDB (idb)** | Client-side database for data persistence |
| **Lucide React** | Icon library |
| **Context API** | State management |

## 📁 Project Structure
invoice-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── src/
├── main.jsx # Entry point
├── App.jsx # Main app component
├── index.css # Global styles with Tailwind
├── types/
│ └── invoice.js # Invoice data structures
├── context/
│ ├── InvoiceContext.jsx # Invoice CRUD operations
│ └── ThemeContext.jsx # Dark/light mode state
└── components/
├── Sidebar.jsx # Navigation sidebar (responsive)
├── Header.jsx # App header with filters
├── InvoiceList.jsx # Invoice listing with filtering
├── InvoiceDetail.jsx # Single invoice view
├── InvoiceForm.jsx # Create/Edit form
├── StatusBadge.jsx # Status indicator component
├── FilterDropdown.jsx # Status filter dropdown
└── DeleteModal.jsx # Confirmation dialog

text

## 🏃‍♂️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AlbertAdekanye/stage-2.git
cd invoice-app
Install dependencies

bash
npm install
Install additional packages (if not already in package.json)

bash
npm install react react-dom lucide-react idb
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
Start the development server

bash
npm run dev
Build for production

bash
npm run build
Preview production build

bash
npm run preview
Environment Setup
No environment variables are required for this application. All data is stored locally in IndexedDB.

🏗️ Architecture Explanation
State Management
The application uses React's Context API for state management:

InvoiceContext: Manages all invoice data and CRUD operations

Uses IndexedDB for persistent storage

Provides methods: addInvoice, updateInvoice, deleteInvoice, markAsPaid

ThemeContext: Manages dark/light mode preference

Persists theme choice in localStorage

Applies dark class to HTML element

Data Flow
text
User Action → Component → Context Method → IndexedDB → State Update → Re-render
Component Hierarchy
text
App
├── ThemeProvider
│   └── InvoiceProvider
│       └── AppContent
│           ├── Sidebar
│           ├── Header
│           │   └── FilterDropdown
│           ├── InvoiceList
│           │   └── StatusBadge
│           ├── InvoiceDetail
│           │   └── StatusBadge
│           ├── InvoiceForm
│           └── DeleteModal
Storage Strategy
IndexedDB was chosen over localStorage because:

Can store larger amounts of data

Supports complex queries

Better performance for frequent updates

Asynchronous operations don't block the UI

Responsive Breakpoints
Breakpoint	Width	Layout
Mobile	< 768px	Top bar navigation, card view
Tablet	768px - 1024px	Sidebar hidden, 2-column card grid
Desktop	> 1024px	Full sidebar, table view
⚖️ Trade-offs
Decisions Made
IndexedDB vs Backend API

✅ Pros: Offline capability, no server costs, faster development

❌ Cons: Data is device-specific, no multi-device sync

Context API vs Redux

✅ Pros: Simpler implementation, less boilerplate, built into React

❌ Cons: Less suitable for extremely complex state management

Tailwind CSS vs CSS Modules

✅ Pros: Rapid development, consistent design system, responsive utilities

❌ Cons: Larger CSS bundle, learning curve for utility classes

Vite vs Create React App

✅ Pros: Faster HMR, quicker builds, smaller bundle size

❌ Cons: Less mature ecosystem, fewer templates

Potential Improvements
Given more time, these enhancements could be implemented:

Authentication - User login/logout with protected routes

Backend API - Express/Node.js backend with PostgreSQL for multi-device sync

Email Notifications - Send invoice PDFs via email

Export Functionality - Export invoices as PDF or CSV

Advanced Search - Search by client name, amount range, date range

Bulk Operations - Delete multiple invoices, bulk status updates

Recurring Invoices - Schedule recurring invoice generation

Payment Integration - Stripe/PayPal integration for online payments

♿ Accessibility Notes
Implemented Features
Semantic HTML

Proper use of <header>, <main>, <aside>, <nav> elements

Buttons use <button> instead of divs with click handlers

Form inputs have associated <label> elements

Keyboard Navigation

Tab order follows visual layout

Focus indicators visible on all interactive elements

ESC key closes modals and forms

Enter key triggers primary actions

ARIA Attributes

aria-label on icon-only buttons

aria-expanded on dropdown toggles

aria-modal and aria-labelledby on dialogs

role="dialog" on modal container

Focus Management

Focus trapped inside modals

Focus returns to trigger element after modal closes

Confirm button auto-focused in delete modal

Color Contrast

WCAG AA compliant color ratios

Dark mode with sufficient contrast

Status colors with additional indicators (dots, icons)

Screen Reader Support

Descriptive text for all actions

Status announcements for dynamic content

Alternative text for all images

Testing Accessibility
Run accessibility audits using:

Chrome DevTools Lighthouse

axe DevTools extension

NVDA/JAWS screen readers

🎯 Improvements Beyond Requirements
Responsive Sidebar - Sidebar transforms into a top bar on mobile devices

Search Functionality - Real-time invoice search by client name or ID

Three-tier Responsive Design - Different layouts for mobile, tablet, and desktop

Hover Action Buttons - Edit/delete buttons appear on hover to reduce visual clutter

Chevron Animation - Smooth transitions on row hover for better UX

Avatar Generation - Dynamic avatar using UI Avatars API

Sticky Headers - Headers remain visible while scrolling

Optimistic Updates - UI updates immediately before IndexedDB confirms

Error Boundaries - Graceful error handling with user-friendly messages

Loading States - Skeleton loaders and loading indicators

🐛 Known Issues
None currently. All core features are functioning as expected.

📝 Future Roadmap
Add unit tests with Jest and React Testing Library

Implement print-friendly invoice view

Add drag-and-drop for invoice items reordering

Integrate with cloud storage (Google Drive, Dropbox)

Add dashboard with analytics and charts

Implement invoice reminders via push notifications

👥 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Figma design inspiration

Lucide React for beautiful icons

Tailwind CSS for utility-first styling

Vite for blazing fast builds

📧 Contact
John Ughiovhe - @johnughiovhe

Project Link: https://github.com/AlbertAdekanye/stage-2

🚀 Quick Start Commands
bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview
📦 Dependencies Summary
json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "idb": "^8.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.8",
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
🎨 Color Palette
Role	Light Mode	Dark Mode
Background	#F8F8FB	#111827
Sidebar	#373B53	#1E2139
Primary	#4F46E5 (indigo-600)	#4F46E5
Success (Paid)	#10B981 (green-500)	#34D399
Warning (Pending)	#F59E0B (amber-500)	#FBBF24
Neutral (Draft)	#6B7280 (gray-500)	#9CA3AF
Built with ❤️ using React and Tailwind CSS

text



## 🏃‍♂️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AlbertAdekanye/stage-2.git
cd invoice-app

npm install

npm install react react-dom lucide-react idb
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer

npm run dev


Environment Setup
No environment variables are required for this application. All data is stored locally in IndexedDB.

 Architecture Explanation
State Management
The application uses React's Context API for state management:

InvoiceContext: Manages all invoice data and CRUD operations

Uses IndexedDB for persistent storage

Provides methods: addInvoice, updateInvoice, deleteInvoice, markAsPaid

ThemeContext: Manages dark/light mode preference

Persists theme choice in localStorage

Applies dark class to HTML element


Data Flow
User Action → Component → Context Method → IndexedDB → State Update → Re-render

Storage Strategy
IndexedDB was chosen over localStorage because:

  Can store larger amounts of data

  Supports complex queries

  Better performance for frequent updates

  Asynchronous operations don't block the U



  Responsive Breakpoints
Breakpoint	Width	Layout
Mobile	< 768px	Top bar navigation, card view
Tablet	768px - 1024px	Sidebar hidden, 2-column card grid
Desktop	> 1024px	Full sidebar, table view
⚖️ Trade-offs
Decisions Made
IndexedDB vs Backend API

✅ Pros: Offline capability, no server costs, faster development

❌ Cons: Data is device-specific, no multi-device sync

Context API vs Redux

✅ Pros: Simpler implementation, less boilerplate, built into React

❌ Cons: Less suitable for extremely complex state management

Tailwind CSS vs CSS Modules

✅ Pros: Rapid development, consistent design system, responsive utilities

❌ Cons: Larger CSS bundle, learning curve for utility classes

Vite vs Create React App

✅ Pros: Faster HMR, quicker builds, smaller bundle size

❌ Cons: Less mature ecosystem, fewer templates

Potential Improvements
Given more time, these enhancements could be implemented:

Authentication - User login/logout with protected routes

Backend API - Express/Node.js backend with PostgreSQL for multi-device sync

Email Notifications - Send invoice PDFs via email

Export Functionality - Export invoices as PDF or CSV

Advanced Search - Search by client name, amount range, date range

Bulk Operations - Delete multiple invoices, bulk status updates

Recurring Invoices - Schedule recurring invoice generation

Payment Integration - Stripe/PayPal integration for online payments

♿ Accessibility Notes
Implemented Features
Semantic HTML

Proper use of <header>, <main>, <aside>, <nav> elements

Buttons use <button> instead of divs with click handlers

Form inputs have associated <label> elements

Keyboard Navigation

Tab order follows visual layout

Focus indicators visible on all interactive elements

ESC key closes modals and forms

Enter key triggers primary actions

ARIA Attributes

aria-label on icon-only buttons

aria-expanded on dropdown toggles

aria-modal and aria-labelledby on dialogs

role="dialog" on modal container

Focus Management

Focus trapped inside modals

Focus returns to trigger element after modal closes

Confirm button auto-focused in delete modal

Color Contrast

WCAG AA compliant color ratios

Dark mode with sufficient contrast

Status colors with additional indicators (dots, icons)

Screen Reader Support

Descriptive text for all actions

Status announcements for dynamic content

Alternative text for all images

Testing Accessibility
Run accessibility audits using:

Chrome DevTools Lighthouse

axe DevTools extension

NVDA/JAWS screen readers

🎯 Improvements Beyond Requirements
Responsive Sidebar - Sidebar transforms into a top bar on mobile devices

Search Functionality - Real-time invoice search by client name or ID

Three-tier Responsive Design - Different layouts for mobile, tablet, and desktop

Hover Action Buttons - Edit/delete buttons appear on hover to reduce visual clutter

Chevron Animation - Smooth transitions on row hover for better UX

Avatar Generation - Dynamic avatar using UI Avatars API

Sticky Headers - Headers remain visible while scrolling

Optimistic Updates - UI updates immediately before IndexedDB confirms

Error Boundaries - Graceful error handling with user-friendly messages

Loading States - Skeleton loaders and loading indicators

🐛 Known Issues
None currently. All core features are functioning as expected.

📝 Future Roadmap
Add unit tests with Jest and React Testing Library

Implement print-friendly invoice view

Add drag-and-drop for invoice items reordering

Integrate with cloud storage (Google Drive, Dropbox)

Add dashboard with analytics and charts

Implement invoice reminders via push notifications

👥 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request


🙏 Acknowledgments
Figma design inspiration

Lucide React for beautiful icons

Tailwind CSS for utility-first styling

Vite for blazing fast builds

📧 Contact
Albert Adekanye - @AlbertAdekanye

Live Link: https://stage-2-seven.vercel.app/




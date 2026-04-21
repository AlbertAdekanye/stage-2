// components/StatusBadge.jsx
import React from 'react';

const StatusBadge = ({ status }) => {

  // Style map for each invoice status type
  const styles = {
    draft: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-600 dark:text-gray-400',
      dot: 'bg-gray-500',
    },
    pending: {
      bg: 'bg-blue-50 dark:bg-orange-950/30',
      text: 'text-orange-600 dark:text-orange-400',
      dot: 'bg-orange-500',
    },
    paid: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      text: 'text-green-600 dark:text-green-400',
      dot: 'bg-green-500',
    },
  };

  // Human-readable labels for each status
  const labels = {
    draft: 'Draft',
    pending: 'Pending',
    paid: 'Paid',
  };

  // Get styling config based on current status
  const style = styles[status];

  return (
    // Status badge container
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >

      {/* Colored status indicator dot */}
      <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>

      {/* Status label text */}
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
import React from 'react';

// Define a default UI for filtering
export default function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      style={{ border: '1px solid #f2f2f2', padding: 4 }}
    />
  );
}

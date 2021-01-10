import React from 'react';

const TableSearchInput = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows.length;

  // Global filter only works with pagination from the first page.
  // This may not be a problem for server side pagination when
  // only the current page is downloaded.

  return (
    <div>
      <input
        type="text"
        className="search"
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
          marginBottom: '10px',
          border: 0
        }}
      />
    </div>
  );
};

export default TableSearchInput;

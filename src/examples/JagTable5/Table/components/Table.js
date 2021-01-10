import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export default function Table({
  getTableProps,
  headerGroups,
  page,
  prepareRow,
  getTableBodyProps
}) {
  console.log('MyTable', {
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    getTableBodyProps
  });
  return (
    <div style={{ backgroundColor: '#fff', overflowX: 'auto' }}>
      <table {...getTableProps()}>
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          page={page}
          prepareRow={prepareRow}
          getTableBodyProps={getTableBodyProps}
        />
      </table>
    </div>
  );
}

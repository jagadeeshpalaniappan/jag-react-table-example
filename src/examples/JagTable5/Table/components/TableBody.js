import React from 'react';

import TableRow from './TableRow';

export default function TableBody({ page, prepareRow, getTableBodyProps }) {
  return (
    <tbody {...getTableBodyProps()}>
      {page.map(row => (
        <TableRow row={row} prepareRow={prepareRow} />
      ))}
    </tbody>
  );
}

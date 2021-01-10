import React from 'react';
import TableCell from './TableCell';

export default function TableRow({ row, prepareRow }) {
  prepareRow(row);
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map(cell => (
        <TableCell row={row} cell={cell} />
      ))}
    </tr>
  );
}

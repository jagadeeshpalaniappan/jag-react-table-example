import React from 'react';
import GroupedCell from './TableGroupedCell';

export default function TableCell({ row, cell }) {
  return (
    <td
      style={{
        margin: '0',
        padding: '0.5rem',
        borderBottom: '1px solid rgba(224, 224, 224, 1)'
      }}
      {...cell.getCellProps()}
    >
      {cell.isGrouped ? (
        <GroupedCell row={row} cell={cell} />
      ) : cell.isAggregated ? (
        // If the cell is aggregated, use the Aggregated renderer for cell
        cell.render('Aggregated')
      ) : // For cells with repeated values, render null
      cell.isPlaceholder ? null : (
        // Otherwise, just render the regular cell
        cell.render('Cell', { editable: true })
      )}
    </td>
  );
}

import React from 'react';

export default function GroupedCell({ row, cell }) {
  return (
    <div>
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? '👇' : '👉'}
      </span>{' '}
      {cell.render('Cell', { editable: false })}({row.subRows.length})
    </div>
  );
}

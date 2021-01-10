import React from 'react';

export default function TableDebugVals({
  pageIndex,
  pageSize,
  pageCount,
  canNextPage,
  canPreviousPage,
  sortBy,
  groupBy,
  expanded,
  filters,
  selectedRowIds
}) {
  return (
    <pre>
      <code>
        {JSON.stringify(
          {
            pageIndex,
            pageSize,
            pageCount,
            canNextPage,
            canPreviousPage,
            sortBy,
            groupBy,
            expanded,
            filters,
            selectedRowIds
          },
          null,
          2
        )}
      </code>
    </pre>
  );
}

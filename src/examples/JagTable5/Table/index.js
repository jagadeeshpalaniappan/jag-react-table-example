import React from "react";
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import TableDebugVals from "./components/TableDebugVals";
import Table from "./components/Table";
import TablePagination from "./components/TablePagination";
import TableSearchInput from "./components/TableSearchInput";
import TableShowHideColumns from "./components/TableShowHideColumns";
import columns from "./options/columns";
import defaultColumn from "./options/defaultColumn";
import filterTypes from "./options/filterTypes";
import useCheckboxSelection from "./plugins/useCheckboxSelection";
import TableAppliedFilters from "./components/TableAppliedFilters";

// Be sure to pass our updateMyData and the skipReset option
function TableIndex({ data, updateMyData, skipReset }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    page,
    headerGroups,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setFilter,
    setGlobalFilter,
    allColumns,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    getToggleHideAllColumnsProps,
    state: {
      pageIndex,
      pageSize,
      sortBy,
      groupBy,
      expanded,
      filters,
      selectedRowIds,
      globalFilter,
    },
  } = useTable(
    {
      data,
      columns,
      defaultColumn,
      filterTypes,
      updateMyData, // isn't part of the API  (available on the instance), we can call this function from our cell renderer
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    // Here we will use a plugin to add our selection column
    useCheckboxSelection
  );

  // Render the UI for your table
  return (
    <div>
      <TableShowHideColumns
        allColumns={allColumns}
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
      />
      <TableSearchInput
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <TableAppliedFilters filters={filters} setFilter={setFilter} />

      <Table
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        page={page}
        prepareRow={prepareRow}
        getTableBodyProps={getTableBodyProps}
      />

      <TablePagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageOptions={pageOptions}
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
      />

      <TableDebugVals
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        sortBy={sortBy}
        groupBy={groupBy}
        expanded={expanded}
        filters={filters}
        selectedRowIds={selectedRowIds}
      />
    </div>
  );
}

export default TableIndex;

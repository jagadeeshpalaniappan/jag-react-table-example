import React from "react";

import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from "react-table";

import { tableData } from "./data";
import customFilterTypes from "../filters/customFilterTypes";
import NumberRangeColumnFilter from "../filters/NumberRangeColumnFilter";
import SelectColumnFilter from "../filters/SelectColumnFilter";
import DefaultColumnFilter from "../filters/DefaultColumnFilter";
import EditableCell from "../components/EditableCell";
import { useCheckboxSelection } from "../components/CheckboxSelection";
import Pagination from "../components/Pagination";
import GlobalSearchFilter from "../components/GlobalSearchFilter";
import ShowHideColumns from "../components/ShowHideColumns";

import Styles from "../Styles";

const defaultColumnConfig = () => ({
  Filter: DefaultColumnFilter,
  Cell: EditableCell,
});

// Be sure to pass our updateMyData and the skipReset option
function Table({
  columns,
  data,
  updateMyData,
  skipReset,
  filterTypes,
  defaultColumn,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    allColumns,
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
      columns,
      data,
      defaultColumn,
      filterTypes,
      // updateMyData isn't part of the API, but anything we put into these options will automatically be available on the instance.
      // That way we can call this function from our cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
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
      <ShowHideColumns
        allColumns={allColumns}
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
      />
      <GlobalSearchFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? "🛑 " : "👊 "}
                      </span>
                    ) : null}

                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? "👇" : "👉"}
                          </span>{" "}
                          {cell.render("Cell", { editable: false })} (
                          {row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render("Cell", { editable: true })
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <Pagination
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
              expanded: expanded,
              filters,
              selectedRowIds: selectedRowIds,
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
function roundedMedian(leafValues) {
  let min = leafValues[0] || 0;
  let max = leafValues[0] || 0;

  leafValues.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });

  return Math.round((min + max) / 2);
}

//["stockId", "name", "yfRating", "rhNOfAnalysts", "rhBuy", "rhHold", "rhSell", "rhgStarRating", "rhgStewardship", "rhgUncertainty"]
const tableCols = [
  {
    Header: "ID",
    accessor: "stockId",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "yfDivYield",
    accessor: "yfDivYield",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
  {
    Header: "yfRating",
    accessor: "yfRating",
    Filter: NumberRangeColumnFilter,
    filter: "between",
    Cell: ({ value, row }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <small style={{ width: 40 }}>({row.original["yfNOfAnalysts"]})</small>
        <div>{value}</div>
      </div>
    ),
  },
  {
    Header: "RH",
    accessor: "rhBuy",
    Cell: ({ value, row }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <small style={{ width: 40 }}>({row.original["rhNOfAnalysts"]})</small>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>B:{row.original["rhBuy"]}</span>
          <span>H:{row.original["rhHold"]}</span>
          <span>S:{row.original["rhSell"]}</span>
        </div>
      </div>
    ),
  },
  {
    Header: "rhgStarRating",
    accessor: "rhgStarRating",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
  {
    Header: "rhgStewardship",
    accessor: "rhgStewardship",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "rhgUncertainty",
    accessor: "rhgUncertainty",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "rhgFairVal",
    accessor: "rhgFairVal",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
];

function ResearchTable({ data, setData }) {
  const columns = React.useMemo(() => tableCols, []);
  const filterTypes = React.useMemo(customFilterTypes, []);
  const defaultColumn = React.useMemo(defaultColumnConfig, []);

  // console.log({ tableData });
  // const [data, setData] = React.useState(() => tableData);

  const [originalData] = React.useState(data);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = React.useRef(false);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    console.log("updateMyData:", { rowIndex, columnId, value });
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    skipResetRef.current = false;
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => {
    // Don't reset the page when we do this
    skipResetRef.current = true;
    setData(originalData);
  };

  return (
    <Styles>
      <button onClick={resetData}>Reset Data</button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipReset={skipResetRef.current}
        filterTypes={filterTypes}
        defaultColumn={defaultColumn}
      />
    </Styles>
  );
}

export default ResearchTable;

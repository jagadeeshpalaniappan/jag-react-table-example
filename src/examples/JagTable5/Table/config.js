import React from "react";
import NumberRangeColumnFilter from "../../../../mystock/components/filters/NumberRangeColumnFilter";
import SelectColumnFilter from "../../../../mystock/components/filters/SelectColumnFilter";

import EditableCell from "../../../../mystock/components/EditableCell";
import DefaultColumnFilter from "../../../../mystock/components/filters/DefaultColumnFilter";

export const tableDefaultColumn = {
  Filter: DefaultColumnFilter,
  Cell: EditableCell,
};

// ["id", "name", "noCell3", "rhNOfAnalysts", "rhBuy", "rhHold", "rhSell", "rhgStarRating", "ddCell1", "ddCell2"]
export const tableCols = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "noCell1",
    accessor: "noCell1",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
  {
    Header: "noCell3",
    accessor: "noCell3",
    Filter: NumberRangeColumnFilter,
    filter: "between",
    Cell: ({ value, row }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <small style={{ width: 40 }}>
          ({row.original && row.original["noCell2"]})
        </small>
        <div>{value}</div>
      </div>
    ),
  },
  {
    Header: "RH",
    accessor: "rhBuy",
    Cell: ({ value, row }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <small style={{ width: 40 }}>
          ({row.original && row.original["rhNOfAnalysts"]})
        </small>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>B:{row.original && row.original["rhBuy"]}</span>
          <span>H:{row.original && row.original["rhHold"]}</span>
          <span>S:{row.original && row.original["rhSell"]}</span>
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
    Header: "ddCell1",
    accessor: "ddCell1",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "ddCell2",
    accessor: "ddCell2",
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

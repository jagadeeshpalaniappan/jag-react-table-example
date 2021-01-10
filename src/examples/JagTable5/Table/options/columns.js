import React from "react";
import NumberRangeColumnFilter from "../components/filters/NumberRangeColumnFilter";
import SelectColumnFilter from "../components/filters/SelectColumnFilter";

// ["id", "name", "noCell3", "rhNOfAnalysts", "rhBuy", "rhHold", "rhSell", "rhgStarRating", "ddCell1", "ddCell2"]
const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "NoCell1",
    accessor: "noCell1",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
  {
    Header: "(noCell2) NoCell3",
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
    Header: "DropdownCell1",
    accessor: "ddCell1",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "DropdownCell2",
    accessor: "ddCell2",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
];

export default columns;

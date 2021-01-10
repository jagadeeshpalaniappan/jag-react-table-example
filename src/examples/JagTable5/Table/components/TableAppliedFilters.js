import React from "react";

export default function TableAppliedFilters({ filters, setFilter }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {filters.map((filter) => (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid #fff",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.7em", marginRight: 8 }}>
            {filter.id}: {JSON.stringify(filter.value)}
          </span>
          <a href onClick={() => setFilter(filter.id, undefined)}>
            &times;
          </a>
        </div>
      ))}
    </div>
  );
}

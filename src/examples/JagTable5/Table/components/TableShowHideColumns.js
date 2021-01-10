import React from "react";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

export default function ShowHideColumns({
  allColumns,
  getToggleHideAllColumnsProps,
}) {
  return (
    <div>
      <h4 style={{ marginTop: 20, marginBottom: 10 }}>Show/Hide Columns:</h4>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#fff",
          padding: "10px 0",
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map((column) => (
          <div key={column.id} style={{ marginLeft: 10 }}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.Header}
            </label>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
}

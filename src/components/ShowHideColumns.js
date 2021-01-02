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
      <div>
        <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle All
      </div>
      {allColumns.map((column) => (
        <div key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
            {column.Header}
          </label>
        </div>
      ))}
      <br />
    </div>
  );
}

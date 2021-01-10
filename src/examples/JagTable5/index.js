import React from "react";
import { tableData } from "./data";
import Table from "./Table";

function ResearchTable() {
  // console.log({ tableData });

  // We need to keep the table from resetting the pageIndex when we Update data.
  // So we can keep track of that flag with a ref.
  const skipResetRef = React.useRef(false);
  const [data, setData] = React.useState(() => tableData);
  const [originalData] = React.useState(data);

  // After data changes, we turn the flag back off
  // so that if data actually changes the page is reset (not when editing it)
  React.useEffect(() => {
    skipResetRef.current = false;
  }, [data]);

  // When our cell renderer calls updateMyData, we'll use the rowIndex, columnId and new value to update the original data
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

  // Let's add a data resetter/randomizer to help to illustrate that flow...
  const resetData = () => {
    skipResetRef.current = true; // Don't reset the page when we do this
    setData(originalData);
  };

  return (
    <div style={{ margin: 20 }}>
      <Table
        data={data}
        updateMyData={updateMyData}
        skipReset={skipResetRef.current}
      />
    </div>
  );
}

export default ResearchTable;

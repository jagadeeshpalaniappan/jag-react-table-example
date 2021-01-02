import React from "react";
import logo from "./logo.svg";
import "./App.css";

import JagTable1 from "./examples/JagTable1"; // Basic
import JagTable2 from "./examples/JagTable2"; // Basic + GroupBy
import JagTable3 from "./examples/JagTable3"; // Basic + GroupBy + MultiColumn
import JagTable4 from "./examples/JagTable4"; // Basic + GroupBy + MultiColumn + GlobalSearch

// import ResearchTable from "./stocks/ResearchTable";
import StockApp from "./stocks/StockApp";

function App() {
  return (
    <div className="App">
      <StockApp />
    </div>
  );
}

export default App;

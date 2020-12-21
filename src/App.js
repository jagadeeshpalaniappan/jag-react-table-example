import React from "react";
import logo from "./logo.svg";
import "./App.css";

import JagTable1 from "./examples/JagTable1"; // Basic
import JagTable2 from "./examples/JagTable2"; // Basic + GroupBy

function App() {
  return (
    <div className="App">
      <JagTable2 />
    </div>
  );
}

export default App;

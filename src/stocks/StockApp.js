import React, { useCallback, useEffect, useState } from "react";
import useFetch, { Provider } from "use-http";
import ResearchTable from "./ResearchTable";
const { getStockTableData } = require("./utils");

// See auto-managed state here: https://bit.ly/2RPfkBd

// Managed State
const StockList = () => {
  const [stockId, setTitle] = useState("");
  const [stocks, setStocks] = useState([]);
  const { get, post, response, loading, error } = useFetch({ data: [] });

  const loadInitialStocks = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const apiStocks = await get("/api/v1/stocks");
    console.log("loadInitialStocks:get:"), apiStocks;
    const stocks = getStockTableData(apiStocks.data);
    if (response.ok) setStocks(stocks);
  }, [get, response]);

  useEffect(() => {
    loadInitialStocks();
  }, [loadInitialStocks]); // componentDidMount

  const addNewStock = useCallback(async () => {
    if (!stockId) return; // if we don't have a stockId, we don't want to add a new stock
    // const { ok } = response // BAD, DO NOT DO THIS
    const newStock = await post("/stocks", { stockId, body: stockId });
    if (response.ok) {
      setTitle("");
      // add the new stock to the front of the list
      setStocks((stocks) => [newStock, ...stocks]);
    }
  }, [post, response, stockId]);

  return (
    <div>
      <input
        type="text"
        placeholder="Add stock"
        value={stockId}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addNewStock}>
        {loading ? "Adding Stock..." : "Add Stock"}
      </button>
      <div>
        {error && "###### Error! #######"}
        <ResearchTable data={stocks} setData={setStocks} />
      </div>
    </div>
  );
};

const API_BASE_URL = "https://jag-stocks-api-v1.vercel.app";
// const API_BASE_URL = "http://localhost:4000";

const App = () => (
  <Provider url={API_BASE_URL} options={{ cachePolicy: "no-cache" }}>
    <StockList />
  </Provider>
);

export default App;

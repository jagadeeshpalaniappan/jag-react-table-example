import { get, toNumber } from "lodash-es";

export function _getHistoryKey() {
  const dt = new Date();
  const yr = dt.getFullYear();
  const month = dt.getMonth() + 1;
  return `${yr}-${month}`;
}

// function get(stock, src, key) {
//   // check: fetchStatus: "COMPLETED"
//   //   return stock[src] ? stock[src][hisKey] && stock[src][hisKey][key] : null;
//   return get(stock, `${src}.${hisKey}.${key}`, null);
// }

export function getStockTableData(apiData) {
  const hisKey = _getHistoryKey();
  return apiData.map((stock, idx) => {
    const rhgFairVal = get(stock, ["rhg", hisKey, "fair_value", "value"]);
    return {
      stockId: stock.stockId,
      name: stock.name,
      yfDivYield: get(stock, ["yf", hisKey, "dividendYield"]),
      yfNOfAnalysts: get(stock, ["yf", hisKey, "numberOfAnalystOpinions"]),
      yfRating: get(stock, ["yf", hisKey, "rating"]),
      rhNOfAnalysts: get(stock, ["rh", hisKey, "nOfAnalysts"]),
      rhBuy: get(stock, ["rh", hisKey, "buy"]),
      rhHold: get(stock, ["rh", hisKey, "hold"]),
      rhSell: get(stock, ["rh", hisKey, "sell"]),
      rhgStarRating: get(stock, ["rhg", hisKey, "star_rating"]),
      rhgStewardship: get(stock, ["rhg", hisKey, "stewardship"]),
      rhgUncertainty: get(stock, ["rhg", hisKey, "uncertainty"]),
      rhgFairVal: rhgFairVal ? Number(rhgFairVal) : null,
    };
  });
}

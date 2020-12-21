export const tableData = [...new Array(15)].map((item, idx) => ({
  id: `ID_${idx}`,
  name: `Name ${idx}`,
  prop1: idx,
  prop2: `prop2 ${idx}`,
  prop3: idx % 2 === 0 ? "even" : "odd",
}));

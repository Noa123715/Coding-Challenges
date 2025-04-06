import query from "./db.js";

async function getCatalogs() {
  const data = await query(`SELECT * FROM catalogs`);
  console.log(data);
  return data;
}

export default { getCatalogs };

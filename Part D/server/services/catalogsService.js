import query from "./db.js";

async function getCatalogs() {
  const data = await query(`SELECT * FROM catalogs`);
  console.log(data);
  return data;
}

async function getAllProducts(user_id) {
  const data = await query(`SELECT product_id, name, price_per_item, min_quantity From Products p
  JOIN Users u ON p.catalog_id = u.catalog_id
  WHERE u.user_id = ${JSON.stringify(user_id)}`);
  console.log(data);
  return data;
}

export default { getCatalogs, getAllProducts };

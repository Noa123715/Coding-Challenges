import query from "./db.js";

async function getOrders(user_id) {
  const data = await query(`SELECT * FROM Orders WHERE user_id = ${JSON.stringify(user_id)}`);
  console.log(data);
  return data;
}

export default { getOrders };
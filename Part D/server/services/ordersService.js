import query from "./db.js";

async function getOrders(user_id) {
  const data = await query(`SELECT * FROM Orders WHERE user_id = ${JSON.stringify(user_id)}`);
  console.log(data);
  return data;
}

async function validOrder(user_id, order_id, status) {
  const data = await query(`UPDATE Orders SET status = ${JSON.stringify(status)} WHERE user_id = ${JSON.stringify(user_id)} AND id = ${JSON.stringify(order_id)}`);
  console.log(data);
  return data;
}

async function getOrderDetails(user_id, order_id) {
  const data = await query(`SELECT * FROM Orders WHERE user_id = ${JSON.stringify(user_id)} AND id = ${JSON.stringify(order_id)}`);
  console.log(data);
  return data;
}

async function getOrderProducts(order_id) {
  const data = await query(`SELECT 
    p.product_id AS product_id,
    p.name AS name,
    oi.quantity AS quantity,
    p.price_per_item AS unit_price,
    (oi.quantity * p.price_per_item) AS total_price
    FROM Order_Items oi
    JOIN Products p ON oi.product_id = p.product_id
    WHERE oi.order_id = ${JSON.stringify(order_id)};`);
  console.log(data);
  return data;
}

export default { getOrders, validOrder, getOrderDetails, getOrderProducts };
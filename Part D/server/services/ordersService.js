import query from "./db.js";

async function getOrders(user_id) {
  const data = await query(`SELECT * FROM Orders WHERE user_id = ${JSON.stringify(user_id)}`);
  console.log(data);
  return data;
}

async function validOrder(user_id, order_id, status) {
  const data = await query(`UPDATE Orders SET status = ${JSON.stringify(status)} WHERE user_id = ${JSON.stringify(user_id)} AND id = ${JSON.stringify(order_id)}`);
  console.log(data);
  return { success: true, data };
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

async function getOrdersStoreOwner() {
  const data = await query(`SELECT o.id, o.status, o.date, o.sum, u.company_name as name
  FROM Orders o
  JOIN Users u ON o.user_id = u.user_id;`);
  console.log(data);
  return data;
}

async function addNewOrder(user_id, newOrder) {
  const { items, total_price } = newOrder;

  // check if total_price and user_id are valid
  const parsedTotal = parseFloat(total_price);
  const parsedUserId = parseInt(user_id);

  if (isNaN(parsedTotal) || isNaN(parsedUserId)) {
    throw new Error(`Invalid input: total_price=${total_price}, user_id=${user_id}`);
  }

  // insert the order
  const insertOrderQuery = `
    INSERT INTO Orders (status, sum, user_id) 
    VALUES ('new', ${JSON.stringify(parsedTotal)}, ${JSON.stringify(parsedUserId)})
  `;
  console.log("Insert Order Query:", insertOrderQuery);
  const orderResult = await query(insertOrderQuery);
  const orderId = orderResult.insertId;

  // build insert items query
  const itemValues = items.map(item => 
    `(${JSON.stringify(orderId)}, ${JSON.stringify(item.product_id)}, ${JSON.stringify(item.quantity)})`
  ).join(', ');

  const insertItemsQuery = `
    INSERT INTO Order_Items (order_id, product_id, quantity) 
    VALUES ${itemValues}
  `;
  console.log("Insert Items Query:", insertItemsQuery);
  await query(insertItemsQuery);

  return { success: true, orderId };
}

export default { getOrders, validOrder, getOrderDetails, getOrderProducts, getOrdersStoreOwner, addNewOrder };
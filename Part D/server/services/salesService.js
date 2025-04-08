import query from "./db.js";
import manageTheSOP from './utilsService.js'

async function getProducts() {
  const data = await query(`SELECT product_id, name, price_per_item FROM products`);
  console.log(data);
  return data;
}

async function endPurchase(orderData) {
  const message = await manageTheSOP(orderData);
  return message;
}

export default { getProducts, endPurchase };
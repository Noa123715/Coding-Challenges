import query from "./db.js";

async function mapProductNamesToIds(orderData) {
    const mapOrders = [];
  
    for (const { product_id, sold_quantity } of orderData) {
      const [product] = await query(`SELECT product_id FROM Inventory WHERE product_id = ${JSON.stringify(product_id)}`);
      if (product) {
        mapOrders.push({ product_id: product.product_id, sold_quantity });
      }
    }
  
    return mapOrders;
  }

async function makeClientOrder(orderData) {
    const notEnoughStock = [];
  
    for (const { product_id, sold_quantity } of orderData) {
      const [inventoryItem] = await query(`SELECT quantity FROM Inventory WHERE product_id = ${JSON.stringify(product_id)}`);
      
      if (!inventoryItem || inventoryItem.quantity < sold_quantity) {
        notEnoughStock.push(product_id);
        continue;
      }
  
      await query(`UPDATE Inventory SET quantity = quantity - ${JSON.stringify(sold_quantity)} WHERE product_id = ${JSON.stringify(product_id)}`);
    }
  
    return notEnoughStock;
}

async function getLowStockProducts() {
    const rows = await query(`
        SELECT product_id 
        FROM Inventory 
        WHERE quantity <= min_quantity
    `);
    return rows.map(row => row.product_id);
}

async function getSuppliersPerProduct(itemsToReorder) {
    const productIds = itemsToReorder.map(item => item);
    
    // get the supplier id for each products
    const rows = await query(`
      SELECT p.product_id, u.user_id
      FROM Products p
      JOIN Users u ON p.catalog_id = u.catalog_id
      WHERE p.product_id IN (${productIds.join(', ')})
    `);
  
    // get the first supplier
    const productToUser = {};
  
    for (const { product_id, user_id } of rows) {
      if (!(product_id in productToUser)) {
        productToUser[product_id] = user_id;
      }
    }
  
    // list of products that dont have a supplier
    const missingProducts = productIds.filter(productId => !(productId in productToUser));
  
    // user_id => [product_id, ...]
    const userToProducts = {};
  
    for (const [product_id, user_id] of Object.entries(productToUser)) {
      if (!userToProducts[user_id]) {
        userToProducts[user_id] = [];
      }
      userToProducts[user_id].push(Number(product_id));
    }

    const result = Object.entries(userToProducts).map(([user_id, products]) => ({
      user_id: Number(user_id),
      products
    }));
  
    // return the supplier + product that dont have a supplier
    return { data: result, missingProducts };
}     

async function makeOrders(productPerSupplier) {
    const orders = [];

    for (const { user_id, products } of productPerSupplier.data) {
        const orderResult = await query(`
            INSERT INTO Orders (status, user_id, sum) 
            VALUES ('new', ${JSON.stringify(user_id)}, 0)
        `);
        
        const orderId = orderResult.insertId;
        let totalSum = 0;

        for (const productId of products) {
            // get the min quantity
            const [product] = await query(`
                SELECT price_per_item, min_quantity 
                FROM Products 
                WHERE product_id = ${JSON.stringify(productId)}
            `);

            if (product) {
                const quantityToOrder = product.min_quantity * 2;

                await query(`
                    INSERT INTO Order_Items (order_id, product_id, quantity) 
                    VALUES (${orderId}, ${JSON.stringify(productId)}, ${JSON.stringify(quantityToOrder)})
                `);

                totalSum += product.price_per_item * quantityToOrder;
            }
        }

        await query(`UPDATE Orders SET sum = ${totalSum} WHERE id = ${orderId}`);
        orders.push(orderId);
    }

    return orders;
}

export default async function manageTheSOP(jsonOrderData) {

    // convert the data to an array
    const orderData = Object.entries(jsonOrderData).map(([product_id, sold_quantity]) => ({
        product_id,
        sold_quantity: Number(sold_quantity),
    }));

    // convert the name of product to ids
    const orderDataWithIds = await mapProductNamesToIds(orderData);
  
    // do the order -> update the inventory
    const notEnoughStock = await makeClientOrder(orderDataWithIds);
  
    // product with low quantity
    const lowStockIds = await getLowStockProducts();
  
    // merge all the product to a list -> without double
    const itemsToReorder = Array.from(new Set([...notEnoughStock, ...lowStockIds]));

    const productPerSupplier = await getSuppliersPerProduct(itemsToReorder);

    // Place the orders for each supplier
    const orders = await makeOrders(productPerSupplier);

    // send the answer to the client
    let messages = ["The process was successful!"];

    if (notEnoughStock.length > 0) {
        messages.push(`Insufficient stock for: ${notEnoughStock.join(', ')}`);
        }
    if (productPerSupplier.missingProducts.length > 0) {
        messages.push(`Missing supplier for: ${productPerSupplier.missingProducts.join(', ')}`);
    }

    return messages.join('\n');
}
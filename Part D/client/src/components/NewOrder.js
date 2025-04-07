import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

export default function NewOrder() {

    const Navigate = useNavigate();

    const [suppliersList, setSuppliersList] = useState([]);
    const [supplierId, setSupplierId] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const [quantity, setQuantity] = useState([]);

    async function getSuppliers() {
        try {
            let response = await fetch('http://localhost:2000/api/users/getSuppliers');
            response = await response.json();
            setSuppliersList(response);
        } catch (error) {
            console.log(error);
        }
    }

    async function chooseSupplier(e) {
        try{
            setSupplierId(e.target.value);
            let response = await fetch(`http://localhost:2000/api/catalogs/getAllProducts/user_id/${e.target.value}`); // get the products list for this supplier
            response = await response.json();
            setProductsList(response);
            setQuantity(Array(response.length).fill(0));
        }
        catch (error) {
            console.log(error);
        }
    }

    async function setQuantityArr(e, index) {
        const value = e.target.value;
        const newQuantity = [...quantity];
        newQuantity[index] = value;
        setQuantity(newQuantity);
    }

    function buildTheOrder() {
        return new Promise((resolve) => {
            // create the list of products in the order
            const filteredItems = productsList
                .map((item, index) => ({
                    product_id: item.product_id,
                    quantity: parseInt(quantity[index], 10),
                    min_quantity: item.min_quantity
                }))
                .filter(item => item.quantity > 0);
        
            // check the quantity
            const invalidItems = filteredItems.filter(item => item.quantity < item.min_quantity);
            
            if (invalidItems.length > 0) {
                const response = window.confirm(
                    `The following items have quantities lower than the minimum: \n` +
                    invalidItems.map(item => `${item.product_id}: ${item.quantity} (Min: ${item.min_quantity})`).join("\n") +
                    "\nDo you want to change the quantity (OK) or remove these items from the order (Cancel)?"
                );
        
                if (response) {
                    resolve(null); // User wants to change quantities -> stop
                    return;
                } else {
                    // Remove invalid items
                    invalidItems.forEach(invalidItem => {
                        const indexToRemove = filteredItems.findIndex(item => item.product_id === invalidItem.product_id);
                        if (indexToRemove !== -1) {
                            filteredItems.splice(indexToRemove, 1);
                        }
                    });
                }
            }
    
            // Always resolve something
            const total_price = filteredItems.reduce((total, item) => {
                const product = productsList.find(p => p.product_id === item.product_id);
                return total + (product.price_per_item * item.quantity);
            }, 0);
    
            resolve({
                items: filteredItems,
                total_price: total_price.toFixed(2)
            });
        });
    }

    async function toOrder() {
        try {
            const orderData = await buildTheOrder();
            alert(JSON.stringify(orderData));
            if(!orderData.items.length){
                alert("Please add at least one product to the order");
                return;
            }
            let response = await fetch(`http://localhost:2000/api/orders/addNewOrder/user_id/${supplierId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData),
                mode: 'cors'
            });
            response = await response.json();
            console.log(response);
            alert(JSON.stringify(response));
            Navigate('/OrderList');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSuppliers();
    }, []);

    return (
        <div className="center">
            <h2>New Order</h2>
            <label for='supplier'>Choose a Supplier:</label>
            <select id="dropdown" onChange={chooseSupplier}>
                <option value="">    Please choose an option    </option>
                {suppliersList.map((supplier, index) => (
                    <option key={index} value={supplier.id}>
                        {supplier.name + " - " + supplier.catalog_name}
                    </option>
                ))}
            </select>
            {(productsList.length > 0 ) && <div>
                <br />
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Minimum Quantity</th>
                            <th>Unit Price</th>
                            <th>Order Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    {productsList.map((item, index) =>
                        <tbody key={index}>
                            <tr>
                                <td>{item.product_id}</td>
                                <td>{item.name}</td>
                                <td>{item.min_quantity}</td>
                                <td>{item.price_per_item}</td>
                                <td><input type="number" id="quantity" name="quantity" onChange={(e) => setQuantityArr(e, index)} /></td>
                                <td>{(item.price_per_item * (quantity[index] || 0)).toFixed(2)}</td> 
                            </tr>
                        </tbody>
                    )}
                </table>
                <h2>The Total Price is: {productsList.reduce((total, item, index) => {const qty = parseInt(quantity[index], 10) || 0; return total + (item.price_per_item * qty);}, 0).toFixed(2)}</h2>
            </div>}
            <button className="myButton" onClick={toOrder}>Finish Order</button>
            <br /><br />
            <button className="myButton" onClick={()=> Navigate('/OrderList')}>Back</button>
        </ div>
    )
}
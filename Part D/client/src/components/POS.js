import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function POS() {

    const Navigate = useNavigate();

    const [productsList, setProductsList] = useState([]);
    const [quantity, setQuantity] = useState([]);

    async function getProducts() {
        try {
            let response = await fetch('http://localhost:2000/api/sales/getProducts');
            response = await response.json();
            response.sort((a, b) => a.name.localeCompare(b.name));
            setProductsList(response);
            setQuantity(Array(response.length).fill(0));
        } catch (error) {
            console.log(error);
        }
    }

    async function setQuantityArr(e, index) {
        const value = e.target.value;
        const newQuantity = [...quantity];
        newQuantity[index] = value;
        setQuantity(newQuantity);
    }

    function buildSimpleOrderData() {
        const orderData = {};
    
        productsList.forEach((item, index) => {
            const qty = parseInt(quantity[index], 10);
            if (qty > 0) {
                orderData[item.name] = qty.toString();
            }
        });
        return orderData;
    }
    

    async function endPurchase() {
        try {
            const orderData = buildSimpleOrderData();
            if (Object.keys(orderData).length === 0) {
                alert("Please add at least one product to the order");
                return;
            }
            let response = await fetch(`http://localhost:2000/api/sales/endPurchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData),
                mode: 'cors'
            });
            response = await response.json();
            console.log(response);
            alert('You completed the Purchase Successfully')
            if (productsList.length > 0) {
                const resetQuantities = productsList.map(() => 0);
                setQuantity(resetQuantities);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return <div className="center">
        <h2>What's in your basket? 🛒</h2>
        <h2>The Total Price is: {productsList.reduce((total, item, index) => {const qty = parseInt(quantity[index], 10) || 0; return total + (item.price_per_item * qty);}, 0).toFixed(2)}</h2>
        {(productsList.length > 0 ) &&
            <div>
                <br />
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Name</th>
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
                                <td>{item.price_per_item}</td>
                                <td><input type="number" id="quantity" name="quantity" value={quantity[index]} onChange={(e) => setQuantityArr(e, index)} /></td>
                                <td>{(item.price_per_item * (quantity[index] || 0)).toFixed(2)}</td> 
                            </tr>
                        </tbody>
                    )}
                </table>
                <button className="myButton newOrder" onClick={endPurchase}>End Purchase</button>
            </div>}
        <button className="POS" onClick={() => Navigate('/OrderList')}>Back To The Orders</button>
    </div>
}
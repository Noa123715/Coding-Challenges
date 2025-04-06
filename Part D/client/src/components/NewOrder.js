import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

export default function NewOrder() {

    const Navigate = useNavigate();

    const [suppliersList, setSuppliersList] = useState([]);
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

    async function toOrder(finish) {
        if (finish === 'finish') {
            // add the order
        }
        Navigate('/OrderList');
    }

    useEffect(() => {
        getSuppliers();
    }, []);

    return (
        <>
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
            {productsList &&
                <table>
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
            }
            <button onClick={() => toOrder('finish')}>Finish Order</button>
            <button onClick={toOrder}>Back</button>
        </>
    )
}
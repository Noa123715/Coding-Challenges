import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewOrder(props) {

    const Navigate = useNavigate();

    const suppliersList = [{ 'name': 'supplier1', 'id': '1' }, { 'name': 'supplier2', 'id': '2' }, { 'name': 'supplier3', 'id': '3' }];
    const [supplier, setsupplier] = useState({ 'name': '', 'id': '' });
    const [productsList, setProductsList] = useState([]);
    const [quantity, setQuantity] = useState(0);

    async function chooseSupplier(e) {
        e.preventDefault();
        setsupplier(prev => ({ ...prev, name: e.target.value }));
        setProductsList([{ 'id': '1', 'name': 'one', 'min_quantity': '1', 'price_per_item': '1' }]);
    }

    async function toOrder(finish) {
        if (finish === 'finish') {
            // add the order
        }
        Navigate('/OrderList');
    }

    return (
        <>
            <h2>New Order</h2>

            <label for='supplier'>Choose a Supplier:</label>
            <select id="dropdown" value={supplier.name} onChange={chooseSupplier}>
                <option value="">    Please choose an option    </option>
                {suppliersList.map((supplier, index) => (
                    <option key={index} value={supplier.name}>
                        {supplier.name}
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
                        <tbody key={item.lesson_id}>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.min_quantity}</td>
                                <td>{item.price_per_item}</td>
                                <td><input type="number" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} /></td>
                                <td>{item.price_per_item * quantity}</td>
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
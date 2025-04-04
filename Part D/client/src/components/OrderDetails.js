import { useState } from "react";

export default function OrderDetails(props) {

    const [orderDetails, setOrderDetails] = useState({ 'id': '1', 'date': '1/1/2021', 'status': 'new', 'user_id': '1' });
    const [productsList, setProductsList] = useState([{ 'id': '1', 'name': 'one', 'quantity': '1', 'price': '1', 'total_price': '1' }]);

    return (
        <>
            <h2>This is all your Products in Order {props.orderId}:</h2>
            {orderDetails &&
                <h3>Status: {orderDetails.status}  Date: {orderDetails.date}</h3>
            }
            {productsList &&
                <table>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    {productsList.map((item, index) =>
                        <tbody key={item.lesson_id}>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.total_price}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            }
            <button onClick={() => props.setView(false)}>Back</button>
            {props.userData?.type === 'supplier' ? <th>You Finish the order? Please Valid</th> : <th>The Order arrived? Please Valid</th>}
            <button onClick={() => props.validOrder(props.orderId)}>Valid Order</button>
        </>
    )
}
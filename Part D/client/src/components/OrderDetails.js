import { useEffect, useState } from "react";

export default function OrderDetails(props) {

    const [orderDetails, setOrderDetails] = useState({
        'id': props.orderId,
        'status': '',
        'date': '',
        'sum': '',
        'user_id': props.userData.user_id
    });
    const [productsList, setProductsList] = useState([]);

    async function getOrderDetails() {
        try {
            // get Order Details
            let response = await fetch(`http://localhost:2000/api/orders/orderDetails/user_id/${props.userData.user_id}/order_id/${props.orderId}`);
            response = await response.json();
            setOrderDetails(response);
            // get Order Products
            response = await fetch(`http://localhost:2000/api/orders/orderProducts/order_id/${props.orderId}`);
            response = await response.json();
            setProductsList(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrderDetails();
    }, []);

    return (
        <>
            <h2>This is all your Products in Order {props.orderId}:</h2>
            {orderDetails &&
                <h3>Status: {orderDetails.status}  Date: {orderDetails.date}  Sum: {orderDetails.sum}</h3>
            }
            {productsList &&
                <table>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    {productsList.map((item, index) =>
                        <tbody key={index}>
                            <tr>
                                <td>{item.product_id}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit_price}</td>
                                <td>{item.total_price}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            }
            <button onClick={() => props.setView(false)}>Back</button>
            {props.userData?.type === 1 ? <th>You Finish the order? Please Valid</th> : <th>The Order arrived? Please Valid</th>}
            <button onClick={() => props.validOrder(props.orderId)}>Valid Order</button>
        </>
    )
}
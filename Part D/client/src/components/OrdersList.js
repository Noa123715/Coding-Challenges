import { useState } from "react";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router-dom";

export default function OrdersList(props) {

  const Navigate = useNavigate();

  const [orderId, setOrderId] = useState(0);
  const [ordersList, setOrdersList] = useState([{ 'id': '1', 'date': '1/1/2021', 'status': 'new', 'user_id': '1' }, { 'id': '2', 'date': '1/1/2021', 'status': 'new', 'user_id': '1' }, { 'id': '3', 'date': '1/1/2021', 'status': 'new', 'user_id': '1' }]);
  const [view, setView] = useState(false);

  async function openView(id) {
    setOrderId(id);
    setView(true);
  }

  async function validOrder(id) {
    //setOrderstatus(id); // change the status of the order with this id
  }

  return (
    <>
      {!view &&
        <div>
          <h1>Hello {props.userData.username}</h1>
          <h2>This is all your orders:</h2>
          {ordersList &&
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Status</th>
                  {props.userData?.type === 'supplier' ? <th>Store Name</th> : <th>Supplier Name</th>}
                  <th>Details</th>
                  <th>Valid</th>
                </tr>
              </thead>
              {ordersList.map((item, index) =>
                <tbody key={item.lesson_id}>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.status}</td>
                    <td>{item.sum}</td>
                    <td>{item.user_id}</td>
                    <td><button onClick={() => openView(item.id)}>View</button></td>
                    <td><button onClick={() => validOrder(item.id)}>Valid</button></td>
                  </tr>
                </tbody>
              )}
            </table>
          }
          {props.userData?.type === 'supplier' ?
            <div></div> :
            <div><h3>Need to order something?</h3><button onClick={() => Navigate('/NewOrder')}>Order Now</button></div>}
        </div>
      }
      {view && <OrderDetails userData={props.userData} orderId={orderId} validOrder={validOrder} setView={setView} />}
    </>
  );
}
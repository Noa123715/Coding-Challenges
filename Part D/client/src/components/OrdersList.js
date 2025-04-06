import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router-dom";

export default function OrdersList(props) {

  const Navigate = useNavigate();

  const [orderId, setOrderId] = useState(0);
  const [ordersList, setOrdersList] = useState([]);
  const [view, setView] = useState(false);

  async function getOrders() {
    try {
      let response = await fetch(`http://localhost:2000/api/Orders/user_id/${props.userData.user_id}`);
      response = await response.json();
      setOrdersList(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function openView(id) {
    setOrderId(id);
    setView(true);
  }

  async function validOrder(id) {
    //setOrderstatus(id); // change the status of the order with this id
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {!view &&
        <div>
          <h1>Hello {props.userData.username} From {props.userData.company_name}</h1>
          <h2>This is all your orders:</h2>
          {ordersList &&
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Sum</th>
                  {props.userData?.user_type_id === 1 ? <th>Store Name</th> : <th>Supplier Name</th>}
                  <th>Details</th>
                  <th>Valid</th>
                </tr>
              </thead>
              {ordersList.map((item, index) =>
                <tbody key={item.lesson_id}>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.status}</td>
                    <td>{item.date}</td>
                    <td>{item.sum}</td>
                    {props.userData.user_type_id === 1 ? <td>Zol-Tov</td> : <td>{item.user_id}</td>}
                    <td><button onClick={() => openView(item.id)}>View</button></td>
                    <td><button onClick={() => validOrder(item.id)}>Valid</button></td>
                  </tr>
                </tbody>
              )}
            </table>
          }
          {props.userData.user_type_id === 1 ?
            <div></div> :
            <div><h3>Need to order something?</h3><button onClick={() => Navigate('/NewOrder')}>Order Now</button></div>}
        </div>
      }
      {view && <OrderDetails userData={props.userData} orderId={orderId} validOrder={validOrder} setView={setView} />}
    </>
  );
}
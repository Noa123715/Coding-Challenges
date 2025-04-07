import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router-dom";

export default function OrdersList(props) {

  const Navigate = useNavigate();

  const [orderId, setOrderId] = useState(0);
  const [ordersList, setOrdersList] = useState([]);
  const [view, setView] = useState(false);

  function sortOrdersByStatusAndDate(orders) {
    const statusOrder = {
      new: 1,
      in_progress: 2,
      completed: 3,
    };
  
    return orders.sort((a, b) => {
      if (statusOrder[a.status] === statusOrder[b.status]) {
        return new Date(a.date) - new Date(b.date);
      }
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }  

  async function getOrders() {
    try {
      let response;
      // for the supplier, get all orders
      if (props.userData.user_type_id === 1) {
        response = await fetch(`http://localhost:2000/api/orders/user_id/${props.userData.user_id}`);
      }
      else { // for the store owner, get all orders
        response = await fetch(`http://localhost:2000/api/orders/store_owner`);   
      }
      response = await response.json();
      const sortedOrders = sortOrdersByStatusAndDate(response);
      setOrdersList(sortedOrders);
    } catch (error) {
      console.log(error);
    }
  }

  async function openView(id) {
    setOrderId(id);
    setView(true);
  }

  async function validOrder(id) {
    try {
      setOrderId(id);
      let toStatus = '';
      let message = '';
      if (props.userData.user_type_id === 2) {
        // store_owner
        const order = ordersList.find(order => order.id === id);
        if (order.status === 'new') {
          message = 'The order is awaiting confirmation from the Supplier who handled it.';
        } else if (order.status === 'in_progress') {
          toStatus = 'completed';
        } else if (order.status === 'completed') {
          message = 'The order has already been completed and cannot be confirmed.';
        }
      } else {
        // supplier
        const order = ordersList.find(order => order.id === id);
        if (order.status === 'new') {
          toStatus = 'in_progress';
        } else if (order.status === 'in_progress') {
          message = 'The order is awaiting confirmation from the store owner who received it.';
        } else if (order.status === 'completed') {
          message = 'The order has already been completed and cannot be confirmed.';
        }
      }
  
      if (message) {
        alert(message);
        return;
      }
  
      // if all is ok -> send the new status
      let response = await fetch(`http://localhost:2000/api/orders/valid`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: props.userData.user_id,
          order_id: id,
          status: toStatus,
        })
      });
      response = await response.json();
  
      setOrdersList(prevOrders => {
        // update status in the order
        const updatedOrders = prevOrders.map(order => {
          if (order.id === id) {
            return {
              ...order,
              status: toStatus || order.status,
            };
          }
          return order;
        });
        return sortOrdersByStatusAndDate(updatedOrders);
      });
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="center">
      {!view &&
        <div>
          <h1>{props.userData.username} From {props.userData.company_name} Phone Number: {props.userData.phone_number}</h1>
          {props.userData.user_type_id === 1 ? 
          <h2>Your Contact in the Company is: {props.userData.contact_person}</h2> : 
          <h2></h2>}
          <h2>This is all your orders:</h2>
          {ordersList &&
            <table className="myTable">
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
                    {props.userData.user_type_id === 1 ? <td>Zol-Tov</td> : <td>{item.name}</td>}
                    <td><button className="tableButton" onClick={() => openView(item.id)}>View</button></td>
                    <td><button className="tableButton" onClick={() => validOrder(item.id)}>Valid</button></td>
                  </tr>
                </tbody>
              )}
            </table>
          }
          {props.userData.user_type_id === 1 ?
            <div></div> :
            <div><h3>Need to order something?</h3><button className="myButton" onClick={() => Navigate('/NewOrder')}>Order Now</button></div>}
        </div>
      }
      {view && <OrderDetails userData={props.userData} orderId={orderId} validOrder={validOrder} setView={setView} />}
    </div>
  );
}
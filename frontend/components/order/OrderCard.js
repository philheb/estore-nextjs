import { useState } from "react";
import moment from "moment";

const OrderCard = ({ order, status, updateOrderStatus }) => {
  const { address } = order;

  const [orderStatus, setOrderStatus] = useState(order.status);

  const showOrderedProducts = () => {
    return order.products.map((product, index) => (
      <tr key={index}>
        <td>{product._id}</td>
        <td>{product.title}</td>
        <td>{product.count}</td>
        <td>${product.price}</td>
        <td>${parseFloat(product.price * product.count).toFixed(2)}</td>
      </tr>
    ));
  };

  const showStatus = () => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status: {orderStatus}</h3>
      <select
        className='form-control'
        onChange={handleStatusChange}
        value={orderStatus}
      >
        <option>Update status</option>
        {status.map((status, index) => {
          return (
            <option key={index} value={status}>
              {status}
            </option>
          );
        })}
      </select>
    </div>
  );
  const handleStatusChange = e => {
    const value = e.target.value;
    setOrderStatus(value);
    updateOrderStatus(order._id, value);
  };

  return (
    <div className='mb-5 mt-5'>
      <h3 className='mb-3 bg-primary text-light p-1'>Order ID : {order._id}</h3>

      <h4>Details</h4>
      <section className='mt-4'>
        <ul className='list-group'>
          <li className='list-group-item'>{showStatus()}</li>
          <li className='list-group-item'>
            Total: ${parseFloat(order.amount).toFixed(2)}
          </li>
          <li className='list-group-item'>
            Transaction ID{order.transaction_id}
          </li>
          <li className='list-group-item'>Ordered by {order.user.name}</li>
          <li className='list-group-item'>
            Ordered on{" "}
            {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </li>
          <li className='list-group-item'>
            Delivery Address:{" "}
            <span>
              {address.firstName} {address.lastName}, {address.address1},{" "}
              {address.address2}, {address.city}, {address.province},{" "}
              {address.postalCode}
            </span>
          </li>
        </ul>
      </section>
      <section className='mt-4'>
        <h4>Order</h4>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Title</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Total</th>
            </tr>
            {showOrderedProducts()}
            <tr>
              <td colSpan='4'>Total</td>
              <td style={{ fontWeight: "bold" }}>
                ${parseFloat(order.amount).toFixed(2)}
              </td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
      {/* <hr /> */}
    </div>
  );
};

export default OrderCard;

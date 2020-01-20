import React from "react";
import moment from "moment";

const OrderCart = ({ order }) => {
  const { address } = order;

  return (
    <div>
      <p
        style={
          order.status === "Not processed"
            ? { color: "red" }
            : { color: "green" }
        }
      >
        Status: {order.status}
      </p>
      <p>Total: ${order.amount}</p>
      <p>Transaction ID{order.transaction_id}</p>
      <p>Ordered by {order.user.name}</p>
      <p>
        Ordered on {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <p>
        Delivery Address:{" "}
        <span>
          {address.firstName} {address.lastName}, {address.address1},{" "}
          {address.address2}, {address.city}, {address.province},{" "}
          {address.postalCode}
        </span>
      </p>

      <hr />
    </div>
  );
};

export default OrderCart;

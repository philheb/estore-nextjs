import { useState, useEffect } from "react";
import { listOrders, getStatus, updateStatus } from "../actions/order";
import { getCookie } from "../actions/auth";
import Layout from "../components/Layout";
import Admin from "../components/auth/Admin";
import OrderCard from "../components/order/OrderCard";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = getCookie("token");

  useEffect(() => {
    loadOrders();
    loadStatus();
  }, []);

  const loadOrders = () => {
    setIsLoading(true);
    listOrders(token).then(data => {
      if (data.error) {
        console.log(error);
        setIsLoading(false);
      } else {
        setOrders(data);
        setIsLoading(false);
      }
    });
  };

  const loadStatus = () => {
    setIsLoading(true);
    getStatus(token).then(data => {
      if (data.error) {
        console.log(error);
        setIsLoading(false);
      } else {
        setStatus(data);
        setIsLoading(false);
      }
    });
  };

  const updateOrderStatus = (orderId, status) => {
    updateStatus(token, orderId, status);
  };

  const showOrders = () => {
    if (orders && orders.length > 0) {
      return orders.map((order, index) => {
        return (
          <OrderCard
            key={index}
            order={order}
            status={status}
            updateOrderStatus={(orderId, status) =>
              updateOrderStatus(orderId, status)
            }
          />
        );
      });
    } else {
      return <h1>No orders</h1>;
    }
  };

  return (
    <Admin>
      <Layout>
        <main className='container'>
          <h2>There is {orders.length} orders.</h2>
          <div>{showOrders()}</div>
        </main>
      </Layout>
    </Admin>
  );
};

export default Order;

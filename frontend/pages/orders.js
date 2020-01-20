import { useState, useEffect } from "react";
import { listOrders } from "../actions/order";
import { getCookie } from "../actions/auth";
import Layout from "../components/Layout";
import Admin from "../components/auth/Admin";
import OrderCart from "../components/order/OrderCart";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = getCookie("token");

  useEffect(() => {
    loadOrders();
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

  const showOrders = () => {
    if (orders && orders.length > 0) {
      return orders.map((order, index) => {
        return <OrderCart key={index} order={order} />;
      });
    } else {
      return <h1>No orders</h1>;
    }
  };

  console.log(orders);

  return (
    <Admin>
      <Layout>
        <main className='container'>
          <div>{showOrders()}</div>
        </main>
      </Layout>
    </Admin>
  );
};

export default Order;

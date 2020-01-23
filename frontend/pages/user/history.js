import { useState, useEffect } from "react";
import Private from "../../components/auth/Private";
import Layout from "../../components/Layout";
import OrderHistoryCard from "../../components/order/OrderHistoryCard";
import { getCookie } from "../../actions/auth";
import { getUserHistory } from "../../actions/user";

const history = () => {
  const [orders, setOrders] = useState([]);

  const token = getCookie("token");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    getUserHistory(token).then(data => {
      if (data.error) {
        console.log(error);
      } else {
        setOrders(data);
      }
    });
  };

  return (
    <Layout>
      <Private>
        <main className='container'>
          <h1>Your Orders</h1>
          <hr className='mb-5' />
          {orders.map((order, index) => {
            return <OrderHistoryCard key={index} order={order} />;
          })}
        </main>
      </Private>
    </Layout>
  );
};

export default history;

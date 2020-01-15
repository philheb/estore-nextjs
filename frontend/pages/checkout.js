import Layout from "../components/Layout";
import { getCart } from "../actions/cart";
import { useEffect } from "react";

const Checkout = ({ products }) => {
  useEffect(() => {}, []);

  const getTotalPrice = () => {
    let productIds = [];
    products.map(product => {
      productIds.push(product._id);
    });
    console.log(productIds);
  };

  return (
    <Layout>
      {JSON.stringify(products)}
      {getTotalPrice()}
    </Layout>
  );
};

export default Checkout;

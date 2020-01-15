import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCart } from "../actions/cart";
import { getCheckoutItems } from "../actions/checkout";
import { getCookie } from "../actions/auth";

const Checkout = () => {
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [total, setTotal] = useState(null);

  const token = getCookie("token");

  useEffect(() => {
    getCartProductIds();
  }, []);

  const getCartProductIds = () => {
    let productIds = [];
    getCart().map(product => productIds.push(product._id));
    getCheckoutItems(token, productIds).then(response => {
      if (response.error) {
        console.log(response.error);
      } else {
        setCheckoutProducts(response.products);
        setTotal(parseFloat(response.total).toFixed(2));
      }
    });
  };

  return (
    <Layout>
      {JSON.stringify(checkoutProducts)}
      {total}
    </Layout>
  );
};

export default Checkout;

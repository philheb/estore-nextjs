import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { getCart } from "../actions/cart";
import { getCookie, handleResponse } from "../actions/auth";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutPayment from "../components/checkout/Checkout";
import Private from "../components/auth/Private";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    setItems(getCart());
  };

  const handlerToggle = () => {
    setShowAddress(!showAddress);
    setShowPayment(!showPayment);
  };

  const onConfirmAddress = address => {
    setAddress(address);
    handlerToggle();
  };

  const showAddressForm = () => {
    if (showAddress) {
      return (
        <section className='mb-5'>
          <Link href='/cart'>
            <a className='text-primary'>Back to cart</a>
          </Link>
          <h2>Address</h2>
          <hr />

          <CheckoutForm
            savedAddress={address}
            onConfirmAddress={address => onConfirmAddress(address)}
          />
        </section>
      );
    }
  };

  const showPaymentForm = () => {
    if (showPayment) {
      return (
        <section className='mb-5'>
          <a onClick={handlerToggle} className='text-primary'>
            Back to address
          </a>
          <h2>Payment</h2>
          <hr />
          <CheckoutPayment savedAddress={address} products={items} />
        </section>
      );
    }
  };

  return (
    <Layout>
      <Private>
        <main className='container'>
          {showAddressForm()}
          {showPaymentForm()}
        </main>
      </Private>
    </Layout>
  );
};

export default Checkout;

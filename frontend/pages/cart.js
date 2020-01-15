import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCart } from "../actions/cart";
import CartCard from "../components/cart/cartCard";
import Checkout from "../components/cart/Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = () => {
    return items.map((product, index) => {
      return (
        <div key={index}>
          <CartCard product={product} />
          <hr className='mt-0' />
        </div>
      );
    });
  };

  return (
    <Layout>
      <main className='container-fluid'>
        <div className='row'>
          <div className='col-md-8'>
            <h1>Shopping Cart ({items.length})</h1>
            <hr className='mt-5' />
            <section>{showItems()}</section>
          </div>
          <div className='col-md-4'>
            <h1>Cart Summary</h1>
            <hr className='mt-5' />
            <Checkout products={items} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Cart;

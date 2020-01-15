import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/Layout";
import { getCart } from "../actions/cart";
import CartCard from "../components/cart/cartCard";
import Checkout from "../components/cart/Checkout";
import { IoMdCart } from "react-icons/io";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    setItems(getCart());
  };

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

  const checkoutHandler = () => {
    Router.push({
      pathname: "/checkout"
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
            {items < 1 ? (
              <Link href='/shop'>
                <a>
                  Continue Shopping <IoMdCart />
                </a>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className='col-md-4'>
            <h1>Cart Summary</h1>
            <hr className='mt-5' />

            <button onClick={checkoutHandler} className='btn btn-success'>
              Checkout Now
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Cart;

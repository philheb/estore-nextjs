import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/Layout";
import { isAuth } from "../actions/auth";
import { getCart } from "../actions/cart";
import CartCard from "../components/cart/cartCard";
import { IoMdCart } from "react-icons/io";
import { getCookie } from "../actions/auth";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    setItems(getCart());
  };

  const showItems = () => {
    if (items && items.length > 0) {
      return items.map((product, index) => {
        return (
          <div key={index}>
            <CartCard product={product} />
            <hr className='mt-0' />
          </div>
        );
      });
    }
  };

  const needToLogin = () => {
    Router.push({
      pathname: "/auth/signin",
      query: {
        message:
          "You are not logged in or your session is expired. Please sign in.",
        nextPath: "/cart"
      }
    });
  };

  const showCheckoutButton = () => {
    if (isAuth() && items && items.length > 0) {
      return (
        <Link href='/checkout'>
          <button className='btn btn-success btn-block'>Checkout Now</button>
        </Link>
      );
    } else if (!isAuth() && items.length > 0) {
      return (
        <button
          onClick={needToLogin}
          className='btn btn-outline-primary btn-block'
        >
          Sign in to checkout
        </button>
      );
    } else {
      return;
    }
  };

  const getTotal = () => {
    if (items && items.length > 0) {
      return items.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
      }, 0);
    } else {
      return "0";
    }
  };

  return (
    <Layout>
      <main className='container-fluid'>
        <div className='row'>
          <div className='col-md-8'>
            <h1>Shopping Cart ({items ? items.length : "0"})</h1>
            <hr className='mt-5' />
            <section>{showItems()}</section>
            {items.length < 1 ? (
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
            <h5 className='mb-3'>
              Total: ${parseFloat(getTotal()).toFixed(2)}
            </h5>
            {showCheckoutButton()}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Cart;

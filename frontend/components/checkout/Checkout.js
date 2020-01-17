import { useState, useEffect } from "react";
import Link from "next/link";
import { isAuth } from "../../actions/auth";
import { getPaymentToken, processPayment } from "../../actions/payment";
import { getCookie } from "../../actions/auth";
import DropIn from "braintree-web-drop-in-react";
import { emptyCard } from "../../actions/cart";
import { createOrder } from "../../actions/order";

const Checkout = props => {
  const { products } = props;

  const [paymentToken, setPaymentToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [instance, setInstance] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(false);

  const token = getCookie("token");

  useEffect(() => {
    getToken();
    setAddress(props.savedAddress);
  }, []);

  const getToken = () => {
    getPaymentToken(token).then(response => {
      if (response.error) {
        setError(response.error);
      } else {
        setPaymentToken(response.clientToken);
      }
    });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      // return parseInt(currentValue + nextValue.count * nextValue.price).toFixed(
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuth() ? (
      showDropIn()
    ) : (
      <Link href='/auth/signin'>
        <a className='btn btn-outline-primary'>Sign in to checkout</a>
      </Link>
    );
  };

  const showDropIn = () => (
    <section>
      {paymentToken && paymentToken !== "" && products.length > 0 ? (
        <article className='mt-3' onBlur={() => setError("")}>
          <DropIn
            options={{
              authorization: paymentToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={instance => setInstance(instance)}
          />

          {loading ? (
            <button className='btn btn-lg btn-success '>
              <div className='spinner-border text-white' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </button>
          ) : !success ? (
            <button
              className='btn btn-lg btn-success mt-3'
              onClick={submitPayment}
            >
              Confirm
            </button>
          ) : (
            ""
          )}
        </article>
      ) : (
        ""
      )}
    </section>
  );

  const showError = () => {
    return error ? <div className='alert alert-danger'>{error}</div> : "";
  };

  const showSuccess = () => {
    return success ? (
      <div className='alert alert-success'>
        Thank you! Your payment was successful.
      </div>
    ) : (
      ""
    );
  };

  const showLoading = () => {
    if (instance === undefined) {
      return <p className='mb-4 text-secondary'>LOADING...</p>;
    }
  };
  const submitPayment = () => {
    setLoading(true);
    let nonce;
    let getNonce = instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce;
        let paymentData = {
          paymentMethodNonce: nonce,
          amount: parseFloat(getTotal()).toFixed(2)
        };
        processPayment(token, paymentData)
          .then(response => {
            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: address
            };

            createOrder(token, orderData)
              .then(response => {
                emptyCard();
                setSuccess(true);
                setLoading(false);
              })
              .catch(error => {
                setLoading(false);
                setError(error.message);
              });
          })
          .catch(error => {
            setLoading(false);
            setError(error.message);
          });
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const showAddress = () => {
    if (address) {
      return (
        <div className='mt-5 mb-5'>
          <p>
            Send to:
            <br />
            {`${address.firstName} ${address.lastName}`}
            <br />
            {address.address1}
            <br />
            {address.address2}
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      <h5>Total: ${parseFloat(getTotal()).toFixed(2)}</h5>
      {showAddress()}
      {showError()}
      {showSuccess()}
      {showLoading()}
      {showCheckout()}
    </div>
  );
};

export default Checkout;

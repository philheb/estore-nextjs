import { useState, useEffect } from "react";
import Link from "next/link";
import { isAuth } from "../../actions/auth";
import { getPaymentToken, processPayment } from "../../actions/payment";
import { getCookie } from "../../actions/auth";
import DropIn from "braintree-web-drop-in-react";
import { emptyCard } from "../../actions/cart";

const Checkout = props => {
  const { products } = props;

  const [paymentToken, setPaymentToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [instance, setInstance] = useState({});
  const [address, setAddress] = useState("");

  const token = getCookie("token");

  useEffect(() => {
    getToken();
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
        <article onBlur={() => setError("")}>
          <DropIn
            options={{
              authorization: paymentToken
            }}
            onInstance={instance => setInstance(instance)}
          />

          <button className='btn btn-success btn-block' onClick={submitPayment}>
            Pay
          </button>
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

  const submitPayment = () => {
    let nonce;
    let getNonce = instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce;
        let paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };
        processPayment(token, paymentData)
          .then(response => {
            setSuccess(response.success);
            //Empty card
            emptyCard();
            //Create order
          })
          .catch(error => {
            setError(error.message);
          });
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h5>Total: ${getTotal()}</h5>
      {showError()}
      {showSuccess()}
      {showCheckout()}
    </div>
  );
};

export default Checkout;

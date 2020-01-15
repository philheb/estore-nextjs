import { useState, useEffect } from "react";
import { updateItem, removeItem } from "../../actions/cart";
import Link from "next/link";
import Router from "next/router";

const CartCard = props => {
  const { product } = props;
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setQuantity(product.count);
  }, []);

  const changeQuantityHandler = e => {
    setError("");
    setQuantity(e.target.value);
  };

  const updateQuantityHandler = productId => e => {
    e.preventDefault;
    if (quantity === NaN || quantity < 1 || quantity > 100) {
      setError("Please select a number between 1 and 100");
    } else {
      updateItem(productId, quantity);
    }
  };

  const removeItemHandler = productId => e => {
    e.preventDefault;
    let answer = window.confirm(
      "Are you sure you want to delete item from your cart?"
    );
    if (answer) {
      removeItem(productId);
      Router.reload("/cart");
    }
  };

  const showCartUpdateOptions = () => {
    return (
      <div>
        <div style={{ width: "50%", maxWidth: "135px" }}>
          <div className='input-group input-group-sm mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Quantity:</span>
            </div>
            <input
              type='number'
              min='1'
              max='100'
              className='form-control'
              value={quantity}
              onChange={changeQuantityHandler}
            />
          </div>
        </div>
        <div className='mt-2'>
          {error && error != undefined && (
            <small className='text-danger'>{error}</small>
          )}
          <button
            onClick={updateQuantityHandler(product._id)}
            className='btn btn-sm btn-primary mr-2'
          >
            Update
          </button>
          <a onClick={removeItemHandler(product._id)}>
            <small style={{ cursor: "pointer" }} className='text-danger ml-2'>
              Delete
            </small>
          </a>
        </div>
      </div>
    );
  };

  return (
    <article className='row'>
      <div className='col-md-4'>
        <Link href={`/product/${product.slug}`}>
          <img
            className='mb-3 img-fluid'
            src={product.imageUrl}
            alt={product.title + " image"}
            style={{ maxWidth: "100%", objectFit: "cover", cursor: "pointer" }}
          />
        </Link>
      </div>
      <div className='col-md-6'>
        <div className='mb-5'>
          <Link href={`/product/${product.slug}`}>
            <h5 style={{ cursor: "pointer" }}>{product.title}</h5>
          </Link>
        </div>

        {showCartUpdateOptions()}
      </div>
      <div className='col-md-2 text-right'>
        <p>{`$${product.price.toFixed(2)}`}</p>
      </div>

      {/* <div className='d-flex justify-content-end'>
        <div>
          {product.quantity < 75 ? (
            <span className='badge badge-warning '>Out of stock</span>
          ) : (
            <a onClick={addToCart} className='icon' style={{ color: "#bbb" }}>
              <IoMdCart style={{ fontSize: 30 }} />
            </a>
          )}
        </div>
      </div> */}
      {/* <hr /> */}
    </article>
  );
};

export default CartCard;

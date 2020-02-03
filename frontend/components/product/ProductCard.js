import { IoMdCart } from "react-icons/io";
import Link from "next/link";
import Review from "./Review";
import { addItem } from "../../actions/cart";
import Router from "next/router";

const ProductCard = props => {
  const { product } = props;

  const addToCart = () => {
    addItem(product);
    Router.push("/cart");
  };

  return (
    <>
      <Link href={`/product/${product.slug}`}>
        <img
          className='mb-4'
          src={product.imageUrl}
          alt={product.title + " image"}
          style={{ maxWidth: "100%", objectFit: "cover", cursor: "pointer" }}
        />
      </Link>
      <Link href={`/product/${product.slug}`}>
        <h5 style={{ cursor: "pointer" }}>{product.title}</h5>
      </Link>
      <p>{`$${product.price.toFixed(2)}`}</p>

      <div className='mb-2'>
        <Review product={product} />
      </div>
      <div className='d-flex justify-content-end'>
        <div>
          {product.quantity < 1 ? (
            <span className='badge badge-warning '>Out of stock</span>
          ) : (
            <a onClick={addToCart} className='icon' style={{ color: "#bbb" }}>
              <IoMdCart style={{ fontSize: 30 }} />
            </a>
          )}
        </div>
      </div>
      {/* <hr /> */}
    </>
  );
};

export default ProductCard;

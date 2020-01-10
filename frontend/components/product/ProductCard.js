import { IoMdCart } from "react-icons/io";
import Link from "next/link";
import Review from "./Review";

const ProductCard = props => {
  const { product } = props;
  product.rating = "25%";
  product.reviews = "100";

  return (
    <div className='col-md-6 col-lg-4 mb-5 small-card'>
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
          <Link href='/'>
            <a className='icon' style={{ color: "#bbb" }}>
              <IoMdCart style={{ fontSize: 30 }} />
            </a>
          </Link>
        </div>
      </div>
      {/* <hr /> */}
      <style jsx>
        {`
          .small-card {
            padding-bottom: 20px;
          }
          .small-card:hover {
            animation-name: shadow;
            animation-duration: 0.3s;
            animation-fill-mode: forwards;
          }
          .icon:hover {
            animation: icon 0.4s forwards;
            // animation-name: icon;
            // animation-duration: 0.9s;
            // animation-fill-mode: forwards;
          }
          @keyframes shadow {
            from {
              box-shadow: 0;
            }
            to {
              box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2),
                0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }
          }
          @keyframes icon {
            from {
              color: #bbb;
            }
            to {
              color: #212529;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductCard;

import Router from "next/router";
import renderHTML from "react-render-html";

import { IoMdCart } from "react-icons/io";
import moment from "moment";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

import { addItem } from "../../actions/cart";
import Review from "../../components/product/Review";

const ProductLargeCard = ({ product }) => {
  const showButtons = () => {
    if (product.quantity > 0) {
      return (
        <div>
          <p>In stock</p>

          <button onClick={addToCart} className='btn btn-primary'>
            <IoMdCart /> Add to Cart
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className='btn btn-secondary' disabled>
            <IoMdCart /> Out of stock
          </button>
        </div>
      );
    }
  };

  const addToCart = () => {
    addItem(product);
    Router.push("/cart");
  };

  return (
    <div className='row'>
      <div className='col-md-6' style={{ zIndex: 2 }}>
        <SideBySideMagnifier
          shadow
          imageSrc={product.imageUrl}
          imageAlt={`${product.title} image`}
        />
        {/* <ReactImageMagnify
          {...{
            smallImage: {
              alt: `${product.title} image`,
              isFluidWidth: true,
              src: product.imageUrl
            },
            largeImage: {
              src: product.imageUrl,
              width: 1800,
              height: 1800
            },
            enlargedImageContainerStyle: { zIndex: 2 },
            imageStyle: { borderRadius: 20 }
          }}
        /> */}
      </div>
      <div className='col-md-6'>
        <h2>{product.title}</h2>
        <Review product={product} />

        <hr />
        <h4>{`$${parseInt(product.price).toFixed(2)}`}</h4>
        <p>{renderHTML(product.description)}</p>
        <p className='text-muted'>
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showButtons()}
      </div>
    </div>
  );
};

export default ProductLargeCard;

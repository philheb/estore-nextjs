import renderHTML from "react-render-html";
import ReactImageMagnify from "react-image-magnify";
import Layout from "../../components/Layout";
import { getProduct } from "../../actions/product";
import Review from "../../components/product/Review";

const Product = ({ product }) => {
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: `${product.title} image`,
                  isFluidWidth: true,
                  src: product.imageUrl
                },
                largeImage: {
                  src: product.imageUrl,
                  enlargedImageContainerStyle: { backgroundColor: "black" },
                  width: 1800,
                  height: 1800
                },
                enlargedImageContainerStyle: { zIndex: 2 }
              }}
            />
          </div>
          <div className='col-md-6'>
            <h2>{product.title}</h2>
            <Review product={product} />
            <hr />
            <h4>{`$${parseInt(product.price).toFixed(2)}`}</h4>
            <p>{renderHTML(product.description)}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Product.getInitialProps = ({ query }) => {
  return getProduct(query.slug).then(response => {
    if (response.error) {
      console.log(data.error);
    } else {
      return { product: response };
    }
  });
};

export default Product;

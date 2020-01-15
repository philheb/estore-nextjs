import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getProduct, listRelated } from "../../actions/product";
import ProductLargeCard from "../../components/product/ProductLargeCard";
import ProductCard from "../../components/product/ProductCard";

const Product = ({ product }) => {
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [relatedProducts, setRelatedProduct] = useState([]);

  useEffect(() => {
    getRelated();
  }, []);

  const getRelated = () => {
    setLoadingRelated(true);
    listRelated(product).then(response => {
      setRelatedProduct(response);
    });
    setLoadingRelated(false);
  };

  const showRelatedProducts = () => {
    return relatedProducts.map((product, index) => {
      return (
        <div key={index} className='col-md-4 small-card mb-4 p-3'>
          <ProductCard product={product} />
        </div>
      );
    });
  };

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 mb-5'>
            <ProductLargeCard product={product} />
          </div>
          {relatedProducts.length > 0 ? (
            <div>
              <h4 className='text-center mb-4'>Related Products</h4>
              <hr />
              <div className='row'>{showRelatedProducts()}</div>
            </div>
          ) : (
            ""
          )}
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

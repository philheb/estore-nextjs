import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../actions/product";

const ProductBy = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadedProducts, setLoadedProducts] = useState([]);

  const { sortBy } = props;

  useEffect(() => {
    setIsLoading(true);
    getProducts(sortBy).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoadedProducts(data);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    );
  } else {
    return loadedProducts.map((product, index) => {
      return <ProductCard key={index} product={product} />;
    });
  }
};

export default ProductBy;

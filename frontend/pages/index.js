import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProducts } from "../actions/product";

const Index = () => {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoadedProducts(data);
      }
      setIsLoading(false);
    });
  };

  const showProducts = () => {
    return loadedProducts.map((product, index) => {
      return (
        <article key={index}>
          <p>{product.title}</p>
          <img
            src={product.imageUrl}
            alt={product.title + " image"}
            style={{ width: 300, height: 300, objectFit: "cover" }}
          />
        </article>
      );
    });
  };

  return (
    <Layout>
      <h2 className='display-4'>Index Page</h2>
      {showProducts()}
    </Layout>
  );
};

export default Index;

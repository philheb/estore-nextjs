import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProducts } from "../actions/product";
import ProductCard from "../components/product/ProductCard";

const Index = () => {
  const [productsBySold, setProductsBySold] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySold();
  }, []);

  const loadProductsBySold = () => {
    setIsLoading(true);
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySold(data);
      }
      setIsLoading(false);
    });
  };

  const loadProductsByArrival = () => {
    setIsLoading(true);
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
      setIsLoading(false);
    });
  };

  const showProductsByArrival = () => {
    return productsByArrival.map((product, index) => {
      return <ProductCard key={index} product={product} />;
    });
  };

  const showProductsBySold = () => {
    return productsBySold.map((product, index) => {
      return <ProductCard key={index} product={product} />;
    });
  };

  return (
    <Layout>
      <main className='container'>
        <h2 className='display-4'>Index Page</h2>
        <section>
          <article className='row'>{showProductsBySold()}</article>
        </section>
      </main>
    </Layout>
  );
};

export default Index;

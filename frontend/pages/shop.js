import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/product/ProductCard";
import { getProducts } from "../actions/product";
import { render } from "react-dom";

const Shop = () => {
  const [loadedCategory, setLoadedCategory] = useState("");
  const [loadedProducts, setLoadedProducts] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999999999);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState("");

  useEffect(() => {
    handleLoadingProducts();
  }, []);

  const handlePrice = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    getProducts("createdAt", min, max, 0).then(data => {
      if (data.error) {
        console.log(error);
      } else {
        setLoadedProducts(data);
        setSkip(limit);
        setSize(data.length);
      }
    });
    renderProducts();
  };

  const handleLoadingProducts = () => {
    getProducts("createdAt", minPrice, maxPrice, skip).then(data => {
      if (data.error) {
        console.log(error);
      } else {
        setLoadedProducts(data);
        setSkip(limit);
        setSize(data.length);
      }
    });
    renderProducts();
  };

  // const showDefaultProducts = () => {
  //   return (
  //     <>
  //       <section className='mb-5'>
  //         <h2>Best Sellers</h2>
  //         <hr className='mb-5' />
  //         <article className='row'>
  //           <ProductBy sortBy='sold' gte={minPrice} lte={maxPrice} />
  //         </article>
  //       </section>
  //       <section className='mb-5'>
  //         <h2>New Arrivals</h2>
  //         <hr className='mb-5' />
  //         <article className='row'>
  //           <ProductBy sortBy='createAt' gte={minPrice} lte={maxPrice} />
  //         </article>
  //       </section>
  //     </>
  //   );
  // };

  const showLoadedProducts = () => {
    return loadedProducts.map((product, index) => {
      return <ProductCard key={index} product={product} />;
    });
  };

  const renderProducts = () => {
    if (loadedProducts) {
      return (
        <section className='mb-5'>
          <h2>All</h2>
          <hr className='mb-5' />
          <article className='row'>{showLoadedProducts()}</article>
        </section>
      );
    } else {
      return <article className='row'>Loading...</article>;
    }
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getProducts("createdAt", minPrice, maxPrice, skip).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedProducts([...loadedProducts, ...data]);
        setSize(data.length);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn btn-outline-primary btn-lg'>
          Load More
        </button>
      )
    );
  };

  return (
    <Layout>
      <main className='container-fluid row'>
        <Sidebar handlePrice={(min, max) => handlePrice(min, max)} />
        <div className='col-md-9 col-lg-10  pl-3'>
          {renderProducts()}
          <div className='text-center pb-5'>{loadMoreButton()}</div>
        </div>
      </main>
    </Layout>
  );
};

export default Shop;

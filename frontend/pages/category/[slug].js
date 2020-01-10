import { useState, useEffect } from "react";
import { getCategory } from "../../actions/category";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import ProductCard from "../../components/product/ProductCard";

const Category = ({ category, query }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const showProducts = () => {
    if (loadingProducts) {
      return (
        <div className='col-md-12'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      );
    } else if (loadedProducts.length > 0) {
      return loadedProducts.map((product, index) => {
        return <ProductCard key={index} product={product} />;
      });
    } else {
      return (
        <div className='col-md-12'>
          <p>No products found.</p>
        </div>
      );
    }
  };

  const loadProducts = () => {
    let lte = maxPrice;
    let gte = minPrice;
    const data = { slug: query.slug, limit, skip, lte, gte };
    setLoadingProducts(true);
    getCategory(data).then(data => {
      if (data.error) {
        console.log(error);
        setLoadingProducts(false);
      } else {
        setLoadedProducts(data.products);
        setSkip(limit);
        setSize(data.products.length);
        setLoadingProducts(false);
      }
    });
  };

  const handlePrice = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    let lte = max;
    let gte = min;
    const data = { slug: query.slug, limit, skip: 0, lte, gte };
    setLoadingProducts(true);
    getCategory(data).then(data => {
      if (data.error) {
        console.log(error);
        setLoadingProducts(false);
      } else {
        setLoadedProducts(data.products);
        setSkip(limit);
        setSize(data.products.length);
        setLoadingProducts(false);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    const data = { slug: query.slug, limit, skip, maxPrice, minPrice };
    getCategory(data).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setLoadedProducts([...loadedProducts, ...data.products]);
        setSize(data.products.length);
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
        <div className='col-md-9 col-lg-10 pl-5'>
          <section className='mb-5'>
            <h2>{category.name}</h2>
            <hr className='mb-5' />
            <article className='row'>{showProducts()}</article>
          </section>

          <div className='text-center pb-5'>{loadMoreButton()}</div>
        </div>
      </main>
    </Layout>
  );
};

Category.getInitialProps = ({ query }) => {
  const data = { slug: query.slug };
  return getCategory(data).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log("DATA: ", data);
      return { category: data.category, query };
    }
  });
};

export default Category;

import Layout from "../../components/Layout";
import { getCategory } from "../../actions/category";
import ProductCard from "../../components/product/ProductCard";
import { listSearch } from "../../actions/product";

const Search = ({ products, category, query }) => {
  const showProducts = () => {
    return products.map((product, index) => (
      <ProductCard key={index} product={product} />
    ));
  };

  return (
    <Layout>
      <main>
        <div className='container-fluid'>
          <header>
            <div className='col-md-12 pt-3'>
              <h3 className='display-5 text-center'>
                Results for{" "}
                <span className='font-italic'>" {query.search} "</span>
              </h3>
              <p className='text-center'>
                We found {products.length} products.
              </p>
              <section className='row'>{showProducts()}</section>
            </div>
          </header>
        </div>
      </main>
    </Layout>
  );
};

Search.getInitialProps = ({ query }) => {
  const category = query.category;
  const search = query.search;

  return listSearch({ search: search || undefined, category: category }).then(
    response => {
      if (response.error) {
        console.log(data.error);
      } else {
        return {
          products: response,
          query
        };
      }
    }
  );
};

export default Search;
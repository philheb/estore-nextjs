import Layout from "../components/Layout";
import ProductBy from "../components/product/ProductBy";
const Index = () => {
  return (
    <Layout>
      <main className='container'>
        <h2 className='display-4 mb-5'>Welcome to our store!</h2>
        <section className='mb-5'>
          <h2>Best Sellers</h2>
          <hr className='mb-5' />
          <article className='row'>
            <ProductBy sortBy='sold' />
          </article>
        </section>
        <section className='mb-5'>
          <h2>New Arrivals</h2>
          <hr className='mb-5' />
          <article className='row'>
            <ProductBy sortBy='createAt' />
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default Index;

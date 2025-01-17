import Admin from "../../components/auth/Admin";
import Layout from "../../components/Layout";
import Product from "../../components/product/CreateProduct";

const CreateProduct = () => {
  return (
    <Layout>
      <Admin>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Create a new product</h2>
            </div>
            <div className='col-md-12'>
              <Product />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CreateProduct;

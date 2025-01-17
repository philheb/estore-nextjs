import Admin from "../../components/auth/Admin";
import Category from "../../components/category/Category";
import Layout from "../../components/Layout";

const createCategory = () => {
  return (
    <Layout>
      <Admin>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Manage Categories</h2>
            </div>
            <div className='col-md-12'>
              <Category />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default createCategory;

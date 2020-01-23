import React from "react";
import UpdateProduct from "../../../components/product/UpdateProduct";
import { getProduct } from "../../../actions/product";
import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";

const Update = ({ product }) => {
  return (
    <Admin>
      <Layout>
        <main className='container'>
          <h2>Update Product</h2>
          <hr />
          <h4>{product.title}</h4>
          <UpdateProduct product={product} />
        </main>
      </Layout>
    </Admin>
  );
};

Update.getInitialProps = ({ query }) => {
  return getProduct(query.slug).then(response => {
    if (response.error) {
      console.log(data.error);
    } else {
      return { product: response };
    }
  });
};

export default Update;

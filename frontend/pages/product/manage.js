import { useState, useEffect } from "react";
import Link from "next/link";
import Admin from "../../components/auth/Admin";
import Layout from "../../components/Layout";
import { getAllProducts, deleteProduct } from "../../actions/product";
import { getCookie } from "../../actions/auth";
import { withRouter } from "next/router";

const ManageProduct = ({ router }) => {
  const [products, setProducts] = useState([]);

  const token = getCookie("token");

  useEffect(() => {
    loadProducts();
  }, []);

  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className='alert alert-success'>{router.query.message}</div>;
    }
    return;
  };

  const loadProducts = () => {
    getAllProducts().then(products => {
      if (products.error) {
        console.log(error);
      } else {
        setProducts(products);
      }
    });
  };

  const removeProduct = slug => {
    deleteProduct(slug, token).then(products => {
      if (products.error) {
        console.log(products.error);
      } else {
        loadProducts();
      }
    });
  };

  return (
    <Layout>
      <Admin>
        <div className='container'>
          {showRedirectMessage()}
          <h2>Manage Products</h2>
          <hr />
          <div className='row'>
            <div className='col-12'>
              <h4>Total Products: {products.length}</h4>
              <ul className='list-group'>
                {products.map((product, index) => {
                  return (
                    <li
                      key={index}
                      className='list-group-item d-flex justify-content-between align-items-center'
                    >
                      <strong>{product.title}</strong>
                      <div>
                        <Link href={`/product/update/${product.slug}`}>
                          <a className='btn btn-sm btn-warning mr-2'>Update</a>
                        </Link>
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={() => removeProduct(product.slug)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default withRouter(ManageProduct);

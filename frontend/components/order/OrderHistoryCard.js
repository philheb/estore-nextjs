import moment from "moment";
import Link from "next/link";

import Ratings from "../product/Ratings";

const OrderHistoryCard = ({ order }) => {
  return (
    <div className='card mb-5'>
      <div className='card-header mb-4'>
        <div className='row'>
          <div className='col-3'>
            <small className='text-uppercase'>Date</small>
          </div>
          <div className='col-3'>
            <small className='text-uppercase'>Total</small>
          </div>
          <div className='col-6 text-right'>
            <small className='text-uppercase'>Order</small>
          </div>
        </div>
        <div className='row'>
          <div className='col-3'>
            <small>{moment(order.createdAt).format("MMMM Do YYYY")}</small>
          </div>
          <div className='col-3'>
            <small>${order.amount}</small>
          </div>
          <div className='col-6 text-right'>
            <small># {order.transaction_id}</small>
          </div>
        </div>
      </div>
      <div className='card-body'>
        {order.products.map((product, index) => {
          return (
            <div key={index} className='row mb-4'>
              <div className='col-md-3'>
                <img
                  src={product.imageUrl}
                  alt={`${product.title} image`}
                  style={{ width: "100%" }}
                />
              </div>
              <div className='col-md-6'>
                <Link href={`/product/${product.slug}`}>
                  <a>
                    <h5>
                      {product.title}
                      <span>
                        {" "}
                        {product.count > 1 ? (
                          <span className='badge badge-secondary'>
                            {product.count}
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </h5>
                  </a>
                </Link>

                <p>${product.price}</p>
                <button className='btn btn-outline-primary mb-4'>
                  Buy Again
                </button>
              </div>

              <div className='col-md-3'>
                <h6>Rate the product:</h6>
                <Ratings productId={product._id} />
              </div>
            </div>
          );
        })}
        <hr />
        <div className=''>
          <small>
            Shipped to:
            <br />
            {`${order.address.firstName} ${order.address.lastName}`},{" "}
            {order.address.address1},{" "}
            {order.address.address2 ? order.address.address2 : " "}
            {order.address.city}, {order.address.province},{" "}
            {order.address.postalCode}
          </small>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;

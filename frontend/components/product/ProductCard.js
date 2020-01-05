const ProductCard = props => {
  const { product } = props;
  product.rating = "75%";

  const stars = () => {
    return (
      <>
        <div className='star-ratings-css'>
          <div
            className='star-ratings-css-top'
            style={{ width: product.rating }}
          >
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <div className='star-ratings-css-bottom'>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
        <style jsx>
          {`
            .star-ratings-css {
              unicode-bidi: bidi-override;
              color: #c5c5c5;
              font-size: 25px;
              height: 25px;
              width: 125px;
              position: relative;
              padding: 0;
              // text-shadow: 0px 1px 0 #a2a2a2;
            }

            .star-ratings-css-top {
              color: #e7711b;
              padding: 0;
              position: absolute;
              z-index: 1;
              display: block;
              top: 0;
              left: 0;
              overflow: hidden;
            }

            .star-ratings-css-bottom {
              padding: 0;
              display: block;
              z-index: 0;
            }
          `}
        </style>
      </>
    );
  };

  return (
    <div className='col-md-4 mb-4'>
      <h4>{product.title}</h4>
      <img
        className='mb-4'
        src={product.imageUrl}
        alt={product.title + " image"}
        style={{ width: 300, height: 300, objectFit: "cover" }}
      />
      <h5>{product.title}</h5>
      <p>{`$${product.price.toFixed(2)}`}</p>
      {stars()}
      <hr />
    </div>
  );
};

export default ProductCard;

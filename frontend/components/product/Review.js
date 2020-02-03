import Rating from "@material-ui/lab/Rating";

const Review = props => {
  const { product } = props;
  return (
    <Rating
      name='read-only'
      value={product.rateAverage ? product.rateAverage : 0}
      readOnly
    />
  );
};

export default Review;

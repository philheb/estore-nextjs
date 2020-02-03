import { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import { getUserRating, rateProduct } from "../../actions/product";
import { getCookie } from "../../actions/auth";
import Rating from "@material-ui/lab/Rating";

const Ratings = props => {
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState(2);
  const token = getCookie("token");

  useEffect(() => {
    getUserRating(props.productId, token).then(rating => {
      setRating(rating);
    });
  }, []);

  const onStarClick = (event, newValue) => {
    setRating(newValue);
    rateProduct(props.productId, newValue, token);
  };

  return (
    <div>
      <Rating name='simple-controlled' value={rating} onChange={onStarClick} />
      {/* <StarRatingComponent
        name='rate1'
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
      /> */}
    </div>
  );
};

export default Ratings;

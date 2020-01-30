import { useState } from "react";
import StarRatingComponent from "react-star-rating-component";

const Ratings = () => {
  const [rating, setRating] = useState(1);

  const onStarClick = nextValue => {
    setRating(nextValue);
  };

  return (
    <div>
      <StarRatingComponent
        name='rate1'
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
      />
      {rating}
    </div>
  );
};

export default Ratings;

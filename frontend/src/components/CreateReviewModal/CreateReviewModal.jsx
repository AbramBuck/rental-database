import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useState } from 'react';
import { addReview } from '../../store/reviewActions';
import { FaStar, FaRegStar } from "react-icons/fa";
import '../../components/CreateReviewModal/CreateReviewModal.css';

function CreateReviewModal({ spot }) {
  const [review, setReview] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleCreate = (e) => {
    e.preventDefault();  

    const reviewData = {
        spotId: spot.id,
        review,
        starRating
    };

    try {
      dispatch(addReview(reviewData.spotId, reviewData.review, reviewData.starRating));
      closeModal();
      window.location.reload();
    } catch (error) {
      setErrors({ submission: "Error when trying to create a review." });
    }
  };

  return (
    <div className='shiny-metal-bg'>
      <h1 className='formTitleText'>How was your stay?</h1>
      {errors.submission && <p className="error">{errors.submission}</p>}
      <form onSubmit={handleCreate}>
        <textarea className='inputArea'
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
          required
        />
        <div className="starsRating">
          {[...Array(5)].map((star, num) => {
            num += 1;
            return (
              <span 
                type="button"
                key={num}
                onClick={() => setStarRating(num)}
                onMouseEnter={() => setHover(num)}
                onMouseLeave={() => setHover(0)}
              >
                {num <= (hover > 0 ? hover : starRating) ? <FaStar className='stars' /> : <FaRegStar className='stars'/>}
              </span>
            );
          })}
          <span className='starsText'>Stars</span>
        </div>
        <div className='buttonDiv'>
          <button type="button" onClick={closeModal}>Close</button>
          <button type='submit'>Submit Your Review</button>
        </div>
      </form>
    </div>
  );
}

export default CreateReviewModal;

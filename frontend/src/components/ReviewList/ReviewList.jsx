import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/reviewActions.js";
import '../ReviewList/ReviewList.css';


function ReviewList({spotInfo}) {
    const spotId = spotInfo.id;
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviews);

    //Data Shape Map
    //review.Reviews [{ id, userId, spotId, review(this is the paragraph), stars, createdAt, updatedAt }] 
    // Review Images Array: review.ReviewImages [{ id: 1, url: info}, { id: 2, url: info}, { id: 3, url: info}]
    // User Object: review.Reviews.User {id, firstName, lastName}

    useEffect(() => {
        dispatch(fetchReviews(spotId));
        }, [dispatch,spotId]);

    if (!reviews || !reviews.Reviews) {
        return <div><h1>Loading...</h1></div>
    }

    return (
        <div className="reviewWrapper">
            {reviews.Reviews?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting reviews by date, newest to oldest
                .map((review) => {
                    // Create a new Date object
                    const date = new Date(review.createdAt);
    
                    // Format the date to 'Oct, 19 2024'
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short', // 'short' gives the month abbreviation like 'Oct'
                        day: 'numeric',
                    });
    
                    return (
                        <div className='reviewArea' key={review.id}> 
                            <div className="reviewHeaderText">{review.User.firstName}</div>
                            <div className="text">{formattedDate}</div> {/* Display formatted date */}
                            <div className="text">{review.review}</div>
                        </div>
                    );
                })
            }
        </div>
    );

}

export default ReviewList;

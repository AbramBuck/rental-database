import { csrfFetch } from "./csrf";

// Reducer Initial State
const initialState = {
    reviews: [], 
    createdReview: [],
    userSpotReviews: [],
};

// Action Type
const GET_REVIEWS = "reviews/getReviews";
const POST_REVIEW = "reviews/postReview";
const CHECK_USER_REVIEW = "reviews/CHECK_USER_REVIEW";

// Action Creators
const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews,
});

const postReview = (createdReview) => ({
        type: POST_REVIEW,
        createdReview,
});

const userReview = (userSpotReviews) => ({
    type: CHECK_USER_REVIEW,
    userSpotReviews,
});

// Thunk - Fetch Reviews for a Spot
export const fetchReviews = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
        const data = await response.json();
        dispatch(getReviews(data));
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

//THUNK - POST Review
export const addReview = (spotId, review, stars) => async(dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                review,
                stars,
                spotId,
            })
        });

        const data = await response.json();
        dispatch(postReview(data));

    } catch (error) {
        console.error('Error creating review', error)
    }

};

//THUNK - GET User Reviews

export const fetchUserReviews = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/reviews/current',
            {
                method: 'GET',
                headers: { 'Content-Type':'application/json'},
            }
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch review status');
        }

        const data = await response.json();

        dispatch(userReview(data.Reviews));

        return data.Reviews;

    } catch (error) {
        console.error('Error fetching reviews owned by current user')
    }
};


// Reducer
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.reviews,  // Store the fetched reviews
            };
        case POST_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.createdReview],
            };
        case CHECK_USER_REVIEW:
            return {
                ...state,
                userSpotReviews: action.userSpotReviews,
            };

        default:
            return state;
    }
};

export default reviewReducer;
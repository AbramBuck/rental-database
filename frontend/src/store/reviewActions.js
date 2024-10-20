import { csrfFetch } from "./csrf";

// Reducer Initial State
const initialState = {
    reviews: [],  // Only reviews are needed
};

// Action Type
const GET_REVIEWS = "reviews/getReviews";

// Action Creators
const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews,
});

// Thunk - Fetch Reviews for a Spot
export const fetchReviews = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
        const data = await response.json();
        
        console.log('Fetched reviews data:', data);  // Check the data structure
        dispatch(getReviews(data));
    } catch (error) {
        console.error('Error fetching reviews:', error);
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

        default:
            return state;
    }
};

export default reviewReducer;
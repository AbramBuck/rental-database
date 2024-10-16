import { csrfFetch } from "./csrf";

//Reducer initial state
const initialState = { 
    spots:[],
    spotDetails: null,    
};

//Action Type - a variable holding the action type (so redundant)
const GET_SPOTS = "spots/getSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";

//Action Creator - the func that returns the variable that holds the action type
const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots,
});

//Get Spot Detials Actio Creator
const getSpotDetails = (spotDetails) => ({
    type: GET_SPOT_DETAILS,
    spotDetails,
});

//Thunk - The actual action to be done
//Get All Spots
export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('api/spots');
    const data = await response.json();
    dispatch(getSpots(data.Spots));
};

//GET SPOT DETAILS THUNK 
export const fetchSpotDetails = (spotId) => async (dispatch) => {

    try{
        const response = await csrfFetch(`/api/spots/${spotId}`);
        const data = await response.json();
        console.log('Spot details fetched:', data);
        dispatch(getSpotDetails(data));
    } catch (error) {
        console.error('Error fetching spot details', error);
    }

};

//Spots Reducer
const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SPOTS:
            return {
                ...state,
                spots: action.spots,
            };
        case GET_SPOT_DETAILS:
            return {
                ...state,
                spotDetails: action.spotDetails,
            };

        default: 
        return state;
    }
};

export default spotsReducer;

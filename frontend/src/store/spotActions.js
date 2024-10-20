import { csrfFetch } from "./csrf";

//Reducer initial state
const initialState = { 
    spots:[],
    spotDetails: null,
    userSpots: [],    
};

//Action Type - a variable holding the action type (so redundant)
const GET_SPOTS = "spots/getSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const GET_USER_SPOTS = "spots/getUserSpots"
const ADD_SPOT = "spots/addSpot";
const ADD_IMAGE_TO_SPOT = "spots/addImageToSpot";
const DELETE_A_SPOT = "spots/deleteSpot";
const UPDATE_SPOT = "spots/updateSpot";

//Action Creators - the func that returns the variable that holds the action type
const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots,
});

const addSpot = (addedSpot) => ({
    type: ADD_SPOT,
    addedSpot,
});


const getUserSpots = (userSpots) => ({
    type: GET_USER_SPOTS,
    userSpots,
});

const getSpotDetails = (spotDetails) => ({
    type: GET_SPOT_DETAILS,
    spotDetails,
});


const addImage = (image) => ({
    type: ADD_IMAGE_TO_SPOT,
    image,
});

const deleteSpot = (spotId) => ({
    type: DELETE_A_SPOT,
    spotId,
});

const updateSpotAction = (updatedSpot) => ({
    type: UPDATE_SPOT,
    updatedSpot,
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
        dispatch(getSpotDetails(data));
    } catch (error) {
        console.error('Error fetching spot details', error);
    }

};

//CREATE SPOT Thunk
export const createSpot = (addedSpot) => async (dispatch) => {
    const { country, address, city, state, description, name, price, lat, lng } = addedSpot;
    try {
        const response = await csrfFetch("/api/spots/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                country,
                address,
                city,
                state,
                description,
                name,
                price,
                lat,
                lng
            })
        });

        if (response.status === 400) {
            const errorData = await response.json(); // Get error details
            throw new Error(errorData.message || 'Validation error occurred');
        }
        if (!response.ok) {
            throw new Error('Failed to create spot');
        }

        const data = await response.json();
        dispatch(addSpot(data)); 
        return data;

    } catch (error) {
        console.error('Error creating spot:', error);
        throw error;
    }
};


//Add Image Thunk
export const addImageToSpot = (spotId, imageUrl, isPreview = false) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId,
          url: imageUrl,
          preview: isPreview
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add image');
      }
  
      const image = await response.json();
      dispatch(addImage(image));
      return image;
    } catch (error) {
      console.error('Error adding image to spot:', error);
      throw error;
    }
  };

//Get User Spots Thunk
export const fetchUserSpots = () => async (dispatch) => {

    try{
        const response = await csrfFetch(`/api/spots/current`);
        const data = await response.json();
        dispatch(getUserSpots(data.Spots));
    } catch (error) {
        console.error('Error fetching spot details', error);
    }
};


//DELETE A SPOT THUNK
export const deleteASpot = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(deleteSpot(spotId));
        } else {
            throw new Error('Failed to delete spot');
        }
    } catch (error) {
        console.error('Error deleting the spot', error);
    }
};

//Update Spot THUNKs
export const updateSpot = (spotId, spot) => async (dispatch) => { 
    console.log("=============THUNK CAKLLL",spotId);
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            
            method: 'PUT',
            body: JSON.stringify(spot),
        });
        if (response.ok) {
            const updatedSpot = await response.json();
            dispatch(updateSpotAction(updatedSpot)); 
            return updatedSpot;
        }
    } catch (err) {
        console.error(`Error updating spot: ${err}`);
    }
};

//SPOT REDUCER//////////////////////////////////////////////////////////////////////////////////////
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
        case ADD_SPOT:
            return {
                ...state,
                spots: [...state.spots, action.addedSpot],
            };
        case ADD_IMAGE_TO_SPOT:
            return {
                ...state,
                spots: state.spots.map((spot) =>
                    spot.id === action.image.spotId
                    ? {...spot, images: [...spot.images, action.image]}
                    :spot
                ), 
            };
        case GET_USER_SPOTS:
            return {
                ...state,
                userSpots: action.userSpots,
            };
        case DELETE_A_SPOT:
        return {
            ...state,
            spots: state.spots.filter(spot => spot.id !== action.spotId),
            userSpots: state.userSpots.filter(spot => spot.id !== action.spotId),
        };
        case UPDATE_SPOT:
            return {
                ...state,
                userSpots: state.userSpots.map((spot) =>
                    spot.id === action.updatedSpot.id ? action.updatedSpot : spot
                ),
            };

        default: 
        return state;
    }
};

export default spotsReducer;

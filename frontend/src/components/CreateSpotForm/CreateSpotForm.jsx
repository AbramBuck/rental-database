import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
//import * as sessionActions from '../../store/session';
import * as spotActions from '../../store/spotActions';
import '../../components/CreateSpotForm/CreateSpotForm.css';
import { createSpot } from '../../store/spotActions';

function CreateSpotFormModal() {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLatitude] = useState(90);
  const [lng, setLongitude] = useState(180);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image3Url, setImage3Url] = useState("");
  const [image4Url, setImage4Url] = useState("");
  const [image5Url, setImage5Url] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();
  let createdSpot = null;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const addedSpot = { country, address, city, state, description, name, price, lat, lng };

    try {
        createdSpot = await dispatch(createSpot(addedSpot));
        console.log('Spot created:', createdSpot);
        // Handle success
    } catch (error) {
        const errorData = await error.json();
        if (errorData?.errors) {
            setErrors(errorData.errors);
        } else {
            console.error('Error creating spot:', error);
        }
    }

    try {

      if (createdSpot.id) {
        await dispatch(spotActions.addImageToSpot(createdSpot.id, previewUrl, true));
  
        const additionalImages = [image2Url, image3Url, image4Url, image5Url].filter(Boolean);
        
        for (const imageUrl of additionalImages) {
          await dispatch(spotActions.addImageToSpot(createdSpot.id, imageUrl, false));
        }
        closeModal();
        window.location.href = `/spots/${createdSpot.id}`;
      } else {
        console.error("Failed to create spot, ID is undefined");
      }
  
    } catch (error) {
      console.error("Error submitting the form:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        

        setErrors(errors);
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <>
    <div className='modal-container'>
      <h1 className='titleText'>Create a New Spot</h1>
      <h2 className='subhead'>Where&apos;s your place located?</h2>
      <caption className='caption'>Guests will only get your exact address once they booked a reservation.</caption>
      <form onSubmit={handleSubmit}>
        <label className='label'>
          Country
          <input className='fullInputWidth'
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        {errors.country && <p className="error-message">{errors.country}</p>}
        <label className='label'>
          Address
          <input className='fullInputWidth'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        {errors.address && <p className="error-message">{errors.address}</p>}
       <div className='cityAndStateDiv'>
            <div className='cityDiv'>
                <label className='label'>
                City
                </label>
                <input className='cityInput'
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </div>
            {errors.city && <p className="error-message">{errors.city}</p>}
            <div className='stateDiv'>
                <label className='label'>
                State
                </label>
                <input className='stateInput'
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </div>
            {errors.state && <p className="error-message">{errors.state}</p>}
        </div>
        <div className='latAndLngDiv'>
            <div className='latitudeDiv'>
                <label className='label'>
                Latitiude
                </label>
                <input className='latInput'
                    placeholder="Must be within -90 and 90"
                    type="text" 
                    value={lat}
                    onChange={(e) => setLatitude(e.target.value)}/>
            </div>
            <div className='longitudeDiv'>
                <label className='label'>
                    Longitude
                </label>
                <input
                placeholder="Must be within -180 and 180"
                type="text"
                value={lng}
                onChange={(e) => setLongitude(e.target.value)} required/>
            </div>
        </div>
        <h2 className='subhead'>Describe your place to guests</h2>
        <caption className='caption'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</caption>
        <label className='label'>
          <input className='fullInputWidth'
            placeholder='Please write at least 30 characters'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {errors.description && <p className="error-message">{errors.description}</p>}
        <h2 className='subhead'>Create a title for your spot</h2>
        <caption className='caption'>Catch guests&apos; attention with a spot title that highlights what makes your place special.</caption>
        <label className='label'>
          <input className='fullInputWidth'
            placeholder='Name of your spot'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p className="error-message">{errors.name}</p>}
        <h2 className='subhead'>Set a base price for your spot</h2>
        <caption className='caption'>Competitive pricing can help your listing stand out and rank higher in search results.</caption>
        <label className='label'>
          <input className='fullInputWidth'
            placeholder="Price per night (USD)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        {errors.price && <p className="error-message">{errors.price}</p>}
        <h2 className='subhead'>Liven up your spot with photos</h2>
        <caption className='caption'>Submit a link to at least one photo to publish your spot.</caption>
        <label className='label'>
          <input className='fullInputWidth'
            type="text"
            value={previewUrl}
            placeholder='Preview Image URL'
            onChange={(e) => setPreviewUrl(e.target.value)}
            required
          />
          {/* Additional images optional */}
          <input className='fullInputWidth'
            type="text"
            placeholder='Image URL'
            value={image2Url}
            onChange={(e) => setImage2Url(e.target.value)}
            required
          />
            <input className='fullInputWidth'
            type="text"
            placeholder='Image URL'
            value={image3Url}
            onChange={(e) => setImage3Url(e.target.value)}
            required
          />
          <input className='fullInputWidth'
            type="text"
            placeholder='Image URL'
            value={image4Url}
            onChange={(e) => setImage4Url(e.target.value)}
            required
          />
            <input className='fullInputWidth'
            type="text"
            placeholder='Image URL'
            value={image5Url}
            onChange={(e) => setImage5Url(e.target.value)}
            required
          />
        </label>
        {errors.previewUrl && <p>{errors.previewUrl}</p>}
        <button type="submit" onClick={handleSubmit}>Create Spot</button>
      </form>
    </div>
    </>
  );
}

export default CreateSpotFormModal;
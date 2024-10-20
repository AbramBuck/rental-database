import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spotActions';
import '../../components/CreateSpotForm/CreateSpotForm.css';

function EditSpotFormModal({ spot }) {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLatitude] = useState("");
  const [lng, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [additionalImages, setAdditionalImages] = useState([]);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setLatitude(spot.lat);
      setLongitude(spot.lng);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
    //   setPreviewUrl(spot.SpotImages.find(image => image.preview)?.url || "");
    //   setAdditionalImages(spot.SpotImages.filter(image => !image.preview).map(image => image.url));
    }
  }, [spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spotData = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      lat,
      lng,
    //   previewUrl
    };
    
    try {
      await dispatch(spotActions.updateSpot(spot.id, spotData));
      closeModal();
      window.location.reload();
    } catch (error) {

      console.error("Error:", error);
      setErrors({ general: "An unexpected error occurred." });
    }
  };

  // Add the rest of your modal code, including input fields and image management

  return (
    <>
    <div className='modal-container'>
      <h1 className='titleText'>Edit Your Spot</h1>
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
        {errors.country && <p>{errors.country}</p>}
        <label className='label'>
          Address
          <input className='fullInputWidth'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        {errors.address && <p>{errors.address}</p>}
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
            {errors.city && <p>{errors.city}</p>}
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
            {errors.state && <p>{errors.state}</p>}
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
        {errors.description && <p>{errors.description}</p>}
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
        {errors.name && <p>{errors.name}</p>}
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
        {errors.price && <p>{errors.price}</p>}
        <button type="submit" onClick={{handleSubmit}}>Update Spot</button>
      </form>
    </div>
    </>
  );
}

export default EditSpotFormModal;
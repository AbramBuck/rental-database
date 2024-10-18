import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
//import * as sessionActions from '../../store/session';
import * as spotActions from '../../store/spotActions';
import '../../components/CreateSpotForm/CreateSpotForm.css';

function CreateSpotFormModal() {
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
  const [previewUrl, setPreviewUrl] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image3Url, setImage3Url] = useState("");
  const [image4Url, setImage4Url] = useState("");
  const [image5Url, setImage5Url] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
      previewUrl
    };
  
    try {
      
      const createdSpot = await dispatch(spotActions.createSpot(spotData));
        console.log('=================createdSpotBELOW================');
        console.log(spotData);
        console.log('=================createdSpotABOVE================')
        console.log('=================createdSpot-----IDbelow================')
        console.log(createdSpot.id);
        console.log(createdSpot);
        console.log('=================createdSpot-----IDabove================')
    //   await dispatch(spotActions.addImageToSpot(
    //    createdSpot.id,
    //     previewUrl,
    //     true 
    //   ));
      
    //   // Filter out empty URLs
    //   const additionalImages = [image2Url, image3Url, image4Url, image5Url].filter(Boolean);
    //   console.log('===================ADDITIONAL IMAGES BELOW=========================')
    //   console.log(additionalImages);
    //   console.log('===================ADDITIONAL IMAGES ABOVE=========================')
    //   for (const imageUrl of additionalImages) {
    //     await dispatch(spotActions.addImageToSpot(
    //       createdSpot.id,
    //       imageUrl,
    //       false 
    //     ));
    //   }

    //   console.log("Spot created with images successfully!");     
  
    } catch (error) {
      console.error("Error submitting the form:", error);

      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general:" An unexpected error occured." });
      }
    }
  };

  return (
    <>
    <div className='modal-container'>
      <h1>Create A Spot</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Country
          <input className='fullInputWidth'
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        {errors.country && <p>{errors.country}</p>}
        <label>
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
                <label>
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
                <label>
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
                <label>
                Latitiude
                </label>
                <input className='latInput'
                    type="text" 
                    value={lat}
                    onChange={(e) => setLatitude(e.target.value)}/>
            </div>
            <div className='longitudeDiv'>
                <label>
                    Longitude
                </label>
                <input
                type="text"
                value={lng}
                onChange={(e) => setLongitude(e.target.value)} required/>
            </div>
        </div>
        <label>
          Describe your location to guests.
          <input className='fullInputWidth'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {errors.description && <p>{errors.description}</p>}
        <label>
          Create a name/title for your location.
          <input className='fullInputWidth'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Set a base price for your rental location.
          <input className='fullInputWidth'
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        {errors.price && <p>{errors.price}</p>}
        <label>
          Add some photos of your location
          <input className='fullInputWidth'
            type="text"
            value={previewUrl}
            placeholder='Add Primary Preview Image URL Here'
            onChange={(e) => setPreviewUrl(e.target.value)}
            required
          />
          {/* Additional images optional */}
          <input className='fullInputWidth'
            type="text"
            placeholder='Add secondary photo here'
            value={image2Url}
            onChange={(e) => setImage2Url(e.target.value)}
            required
          />
            <input className='fullInputWidth'
            type="text"
            placeholder='Add secondary photo here'
            value={image3Url}
            onChange={(e) => setImage3Url(e.target.value)}
            required
          />
          <input className='fullInputWidth'
            type="text"
            placeholder='Add secondary photo here'
            value={image4Url}
            onChange={(e) => setImage4Url(e.target.value)}
            required
          />
            <input className='fullInputWidth'
            type="text"
            placeholder='Add secondary photo here'
            value={image5Url}
            onChange={(e) => setImage5Url(e.target.value)}
            required
          />
        </label>
        {errors.previewUrl && <p>{errors.previewUrl}</p>}
        <button type="submit" onClick={handleSubmit}>Create New Spot</button>
      </form>
    </div>
    </>
  );
}

export default CreateSpotFormModal;
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spotActions';
import { FaStar } from "react-icons/fa6";
import image1 from '../../images/defaultImage-01.jpg'
import image2 from '../../images/defaultImage-02.jpg'
import image3 from '../../images/defaultImage-03.jpg'
import image4 from '../../images/defaultImage-04.jpg'
import '../SpotDetailsPage/SpotStylesPage.css';

function SpotDetailsPage() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotDetails);
    console.log('=============HERE DOWN====================');
    console.log(spot); // info on the spot. {id, ownerId, price, name, description, lat, lng address, city, state, }
    console.log('=============HERE UP====================');
   
    useEffect(() => {
        const loadSpotDetails = async () => {
            await dispatch(fetchSpotDetails(spotId));
        };
        loadSpotDetails();
    }, [dispatch, spotId]);

    if (!spot) return <div>
        <h1>
        Loading...
        </h1>
        </div>
    //SpotImages is an array holding all images on the spot. { id : the id of the image, url, preview : boolean for if the image is the preview image}
    const previewImage = spot.SpotImages?.find((image) => image.preview)?.url || spot.SpotImages[0].url;
    const alertMsg = () => {
        alert('Feature Coming Soon!');
    };

    return (
        <>
        <div className='pageWrapper'>
            <div className='topTextArea'>
                <h1 className='titleText'>{spot.name}</h1>
                <h3 className='text'>{spot.city}, {spot.state},{spot.country}</h3>
            </div>
            <div className='imageArea'>
                <div className='heroImageArea'><img src={previewImage} alt={spot.name} className='heroImage' /></div>
                <div className='sideImagesArea'>
                    {spot.SpotImages.length > 0 && (
                        <>
                            <img 
                                src={spot.SpotImages[1]?.url || image1} 
                                alt="Stormwind" 
                                className='sideImage'
                            />
                            <img 
                                src={spot.SpotImages[2]?.url || image2} 
                                alt="Stormwind" 
                                className='sideImage' 
                            />
                            <img 
                                src={spot.SpotImages[3]?.url || image3} 
                                alt="Stormwind" 
                                className='sideImage'
                            />
                            <img 
                                src={spot.SpotImages[4]?.url || image4} 
                                alt="Stormwind" 
                                className='sideImage'
                            />
                        </>
                    )}
                </div>
            </div>
            <div className='detailsReserveWrapper'>
                <div className='detailsArea'>
                    <div className='hostedByText'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                    <div className='arsenal-sc-regular'>{spot.description}</div>
                </div>
                <div className='reserveArea'>
                    <div className='priceReviewArea'>
                           <div className='spotPrice'>{spot.price} night</div> <div><FaStar /> #.#</div> <div># reviews</div>
                    </div>
                    <div className='buttonDiv'>
                        <button onClick={alertMsg}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className='reviewArea'>
                <div className='reviewHeader'>
                <div><FaStar /> </div><div><h2>#.#</h2></div><div><h2># Reviews</h2></div>
                </div>
                <div className='divider'></div>
                <div className='reviewEntryArea'>
                    <div>Reviewer First Name</div>
                    <div>Date of Review</div>
                    <div>Review Details Text will be in paragraph format</div>
                </div>
                
                
            </div>
        </div>
        </>
    )
}

export default SpotDetailsPage;
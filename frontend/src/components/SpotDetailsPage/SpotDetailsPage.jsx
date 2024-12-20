import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spotActions';
import ReviewList from '../ReviewList/ReviewList';
import { FaStar } from "react-icons/fa6";
import { RxDotFilled } from "react-icons/rx";
import image1 from '../../images/defaultImage-01.jpg';
import image2 from '../../images/defaultImage-02.jpg';
import image3 from '../../images/defaultImage-03.jpg';
import image4 from '../../images/defaultImage-04.jpg';
import defaultPreview from '../../images/defaultImage-00-Preview.jpg'
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal';
import '../SpotDetailsPage/SpotStylesPage.css';
import { fetchUserReviews } from '../../store/reviewActions';
import { showStarRating } from '../../utils/SpotUtils';


// some info on the spot object {id, ownerId, price, name, description, lat, lng address, city, state, }

function SpotDetailsPage() {
    const userSpotReviews = useSelector((state) => state.reviews.userSpotReviews);
    const sessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotDetails);
    let reviewCoutner;
    let noReveiwMessage = <h1>Be the first to post a review!</h1>;

    console.log(spot);
   
    //console.log('UserSpotReviews:', userSpotReviews, '=======================')
    useEffect(() => {
            dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(fetchUserReviews());
    }, [dispatch]); 
    
    if (!spot) {
        return <div><h1>Loading...</h1></div>;
    }

    //Check if user has a review on this spot
    const hasReviewedCurrentSpot = userSpotReviews.some(review => review.spotId === parseInt(spotId));

    // userSpotReviews {id, userId, spotId, review}
    //SpotImages is an array holding all images on the spot. { id : the id of the image, url, preview : boolean for if the image is the preview image}
    const previewImage = spot.SpotImages?.find((image) => image.preview)?.url;
    const alertMsg = () => {
        alert('Feature Coming Soon!');
    };

    if (spot.numReviews == 0) {
        reviewCoutner = "";
     }else if (spot.numReviews == 1) {
        reviewCoutner = `${spot.numReviews} Review`;
    } else {
        reviewCoutner =`${spot.numReviews} Reviews`;
    }

    return (
        <>
        <div className='pageWrapper'>
            <div className='topTextArea'>
                <h1 className='titleText'>{spot.name}</h1>
                <h3 className='text'>LOCATION: {spot.city}, {spot.state},{spot.country}</h3>
            </div>
            <div className='imageArea'>
                <div className='heroImageArea'><img src={previewImage ? previewImage : defaultPreview} alt={spot.name} className='heroImage' /></div>
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
                           <div className='spotPrice'>{spot.price} night</div> <div className='arsenal-sc-bold-25px star'><FaStar /> {showStarRating(spot)}</div><div className='dot'>{spot.numReviews == 0 ? "" : <RxDotFilled />}</div><div className='arsenal-sc-bold-25px star'>{reviewCoutner}</div>
                    </div>
                    <div className='buttonDiv'>
                        <button onClick={alertMsg}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className='reviewArea'>
                <div className='reviewHeader'>
                    <div className='reviewHeaderInfo'>
                        <div className='star'><FaStar /> {showStarRating(spot)}</div><div className='dot'>{spot.numReviews == 0 ? "" : <RxDotFilled />}</div><div><h2>{reviewCoutner}</h2></div>
                    </div>
                    
                    <div className={sessionUser && !hasReviewedCurrentSpot ? 'buttonDiv' : 'gone'}>
                    {sessionUser !== null && sessionUser?.id != spot.ownerId ? 
                    <OpenModalButton buttonText="Add A Review"  modalComponent={() => <CreateReviewModal spot={spot} />}/> 
                    : ""}
                    </div>
                </div>
                <div className='divider'></div>
                <div className='reviewEntryArea'>
                    {spot.numReviews == 0 && sessionUser?.id != spot.ownerId ? noReveiwMessage : <ReviewList  spotInfo={spot}/>}                       
                </div>
            </div>
            <div className='bgGraphicDetailsPage'></div>
        </div>
        </>
    )
}

export default SpotDetailsPage;
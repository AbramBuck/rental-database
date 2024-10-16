import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spotActions';
import image2 from '../../images/Stormwind_2_tradedistrict.jpg'
import '../SpotDetailsPage/SpotStylesPage.css';

function SpotDetailsPage() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotDetails);
    console.log('=============HERE DOWN====================');
    console.log(spot);
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

    const previewImage = spot.SpotImages?.find((image) => image.preview)?.url || spot.SpotImages[0].url;

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
                    <img src={image2} alt="Stormwind" className='sideImage'/>
                    <img src={image2} alt="Stormwind" className='sideImage' />
                    <img src={image2} alt="Stormwind" className='sideImage'/>
                    <img src={image2} alt="Stormwind" className='sideImage'/>
                </div>
            </div>
            <div className='detailsArea'>
                <div className='title'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                <div className='arsenal-sc-regular'>{spot.description}</div>
            </div>
            <div></div>
            <div></div>
        </div>
        </>
    )
}

export default SpotDetailsPage;
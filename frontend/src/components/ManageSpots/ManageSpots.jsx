import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import '../ManageSpots/ManageSpots.css';
import { fetchUserSpots } from '../../store/spotActions';
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
import EditSpotFormModal from '../EditSpotFormModal/EditSpotFormModal.jsx';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal.jsx';
import CreateSpotFormModal from '../CreateSpotForm/CreateSpotForm.jsx';

function ManageSpots() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.userSpots);

    // Grab the User's Spots
    useEffect(() => { 
        dispatch(fetchUserSpots());
    }, [dispatch]);
     
    

    return (
        <div className='pageWrapper'>
            <div className='topTextArea'>
                <h1 className='titleText'>Manage Spots Owned By {sessionUser.username}</h1>
            </div>
            <div> 
                <div className='userSpotsArea'>
                    {!spots.length ? <div><h1>You Don&apos;t Have Any Spots.</h1>
                    <OpenModalButton buttonText="Create A Spot"  modalComponent={<CreateSpotFormModal />}/>
                    </div> : ""}
                    {/* generate a div for each spot */}
                    {spots.map((spot) => (
                        <div key={spot.id} className='imageDiv'>
                            <Link to={`/spots/${spot.id}`}>
                                <img src={spot.previewImage} title={spot.name} alt={spot.name} className="allSpotImg"/>
                            </Link>
                            <div className='spotInfoDiv'>
                                <div className='cityStateStarDiv'>
                                    <p>{spot.city},</p>
                                    <p>{spot.state}</p>
                                </div>
                                <div className='priceAreaDiv'>
                                    <div className='priceDiv'>
                                        <h3>${spot.price}</h3> 
                                        <p>night</p>
                                    </div>
                                    <div className='ratingAreaDiv'>
                                        <FaStar className='star' />
                                        <div className='ratingDiv'>
                                            {spot.avgRating == 0 ? <p className='rating'>New</p> : Number(spot.avgRating)}
                                        </div>
                                    </div>
                                </div>
                                <div className='buttonArea'>
                                    <div>
                                        <OpenModalButton buttonText="Update"  modalComponent={<EditSpotFormModal spot={spot} image={spot.previewImage} />}/>
                                    </div>
                                    <OpenModalButton buttonText="Delete"  modalComponent={<DeleteConfirmModal spot={spot}/>}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='bgGraphicManagePage'></div>
            </div>
        </div>
    );
}

export default ManageSpots;
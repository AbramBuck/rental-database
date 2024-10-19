import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSpots } from '../../store/spotActions';
import bgVideo from '../../images/Homepage-BG-video.mp4';
import logo from '../../images/Hearth-Havens_TextLogo.png';
//import '../SpotDetailsPage/SpotStylesPage.css';
import '../HomePage/Homepage.css';
import { FaStar } from "react-icons/fa";


function HomePage(){
const dispatch = useDispatch();
const spots = useSelector((state) => state.spots.spots);

// this actually executes the fetchSpots action
useEffect(() => { 
dispatch(fetchSpots());
}, [dispatch]);

let marketingText = "Immerse yourself in the breathtaking realms of Azeroth, where comfort meets adventure at every turn. Your perfect retreat awaits, tailored to offer both relaxation and discovery in the heart of this legendary world.";

//for each spot i can access id, name, price, city, state, description, avgRating

return (
        <div className='pageWrapper'>
        <img className='logoOverlay' src={logo} alt="Hearths & Haven Icon"></img>
        <video className='bgVideo' src={bgVideo} alt="Hearths and Havens" autoPlay muted loop />
        <div className='textOverlay arsenal-sc-bold'>{marketingText}</div>
        <div> 
            <div className='allSpotsArea'>
                {/* generate a div for each spot */}
                {spots.map((spot) =>(
                    <div key={spot.id}>
                        <Link to={`/spots/${spot.id}`}>
                        <img src={spot.previewImage} title={spot.name} alt={spot.name} className="allSpotImg"/>
                        
                        <div className='spotInfoDiv'>
                            <div className='cityStateStarDiv'>
                                <div>{spot.city}</div>
                                <div>{spot.state}</div>
                            </div>
                            <div className='priceDiv'>
                                <div><h3>{spot.price}</h3> night</div>
                                <div><FaStar /> {spot.avgRating == 0 ? "New" : spot.avgRating}</div>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))};
            </div>
            <div className='bgGraphic'></div>
        </div>
        </div>
)
}

export default HomePage;
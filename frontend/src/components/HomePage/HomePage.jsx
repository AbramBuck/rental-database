import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSpots } from '../../store/spotActions';
import bgVideo from '../../images/Homepage-BG-video.mp4';
import logo from '../../images/Hearth-Havens_TextLogo.png';
//import '../SpotDetailsPage/SpotStylesPage.css';
import '../HomePage/Homepage.css';
import { FaStar } from "react-icons/fa";
import defaultPreview from '../../images/defaultImage-00-Preview.jpg'

// function starRating(){
//     const spots = useSelector((state) => state.spots.spots);
//     try {
//     if (!spots){
//         return "";
//     } else {
//         return spots.avgRating == 0 ? "New" : spots.avgRating.toFixed(1)
//     }    
//     } catch(error) {
//         return " "
//     }
// }

function HomePage(){
const dispatch = useDispatch();
const spots = useSelector((state) => state.spots.spots);
const sessionUser = useSelector(state => state.session.user);

useEffect(() => { 
dispatch(fetchSpots());
}, [dispatch]);

let marketingText = "Immerse yourself in the breathtaking realms of Azeroth, where comfort meets adventure at every turn. Your perfect retreat awaits, tailored to offer both relaxation and discovery in the heart of this legendary world.";

function alertMsg() {
    alert("Login to view spots")
}
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
                        <Link to={sessionUser ? `/spots/${spot.id}` : ""}>
                        <img src={spot.previewImage ? spot.previewImage : defaultPreview} title={spot.name} alt={spot.name} className="allSpotImg" onClick={!sessionUser ? ()=> alertMsg() : null}/>
                        </Link>
                        <div className='spotInfoDiv'>
                            <div className='cityStateStarDiv'>
                                <p>{spot.city},</p>
                                <p>{spot.state}</p>
                            </div>
                            <div className='priceAreaDiv'>
                                <div className='priceDiv'><h3>${spot.price}</h3> <p>night</p></div>
                                <div className='ratingAreaDiv'><FaStar className='star' /></div> <div className='ratingDiv'>{spot.avgRating == 0 ? "New" : spot.avgRating.toFixed(1)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='bgGraphic'></div>
        </div>
        </div>
)
}

export default HomePage;
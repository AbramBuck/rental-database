import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSpots } from '../../store/spotActions';
import bgImage from '../../images/Hearths-Havens-bg-no-text.png';
import logo from '../../images/Hearth-Havens_TextLogo.png';
import '../SpotDetailsPage/SpotStylesPage.css';


function HomePage(){
const dispatch = useDispatch();
const spots = useSelector((state) => state.spots.spots);

// this actually executes the fetchSpots action
useEffect(() => { 
dispatch(fetchSpots());
}, [dispatch]);


return (
    <div className='pageWrapper'>
        <img className='logoOverlay' src={logo} alt="Hearths & Haven Icon"></img>
        <div className='bgImage'><img src={bgImage} alt="Stormwind" /></div>
        <div className='textOverlay arsenal-sc-bold'>Relax as you experience the wonderous locations of Azeroth!</div>
        <div> 
            <div className='allSpotsArea'>
                {/* this div will generate a div for each spot */}
                {spots.map((spot) =>(
                    <div key={spot.id}>
                        <Link to={`/spots/${spot.id}`}>
                        <img src={spot.previewImage} alt={spot.name} className="allSpotImg"/>
                        </Link>
                    </div>
                ))};
            </div>
        </div>
    </div>
)
}

export default HomePage;
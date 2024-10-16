import {useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';
import bgImage from '../../images/Hearths-Havens-bg-no-text.png';
import logo from '../../images/Hearth-Havens_TextLogo.png';
import '../SpotDetailsPage/SpotStylesPage.css';


function HomePage(){
    const [spots, setSpots] = useState([]);
    // shape of spots is an object with a key of Spots value of [ {each spot},{id, ownerId, address, city,state, country, name, price, description} ]

    useEffect(() => {
        const fetchSpots = async () => {
            const response = await csrfFetch('/api/spots', {method:'GET'});
                const data = await response.json();
                setSpots(data.Spots);
                console.log('====================SPOTS DATA =========================')
                console.log(data.Spots);
                console.log('====================SPOTS DATA =========================')
        };
        fetchSpots();

    }, []);
   

return (
    <>
    <div className='pageWrapper'>
            <img className='logoOverlay' src={logo}></img>
            <div className='bgImage'><img src={bgImage} alt="Stormwind" /></div>
        <div className='textOverlay arsenal-sc-bold'>Relax as you experience the wonderous locations of Azeroth!</div>
        <div> 
            {/* get all spots wrapper */}
            <div className='allSpotsArea'>
                {/* this div will generate a div for each spot */}
                {spots.map((spot) =>(
                    <div key={spot.id}>
                        <img src={spot.previewImage} alt={spot.name} className="allSpotImg"/>
                    </div>
                ))};
            </div>
        </div>
    </div>
    </>
)
}

export default HomePage;
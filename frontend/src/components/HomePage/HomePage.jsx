import bgImage from '../../images/Hearths-Havens-bg-no-text.png'
import logo from '../../images/Hearth-Havens_TextLogo.png'
import '../SpotDetailsPage/SpotStylesPage.css';


function HomePage(){


return (
    <>
    <div className='pageWrapper'>
            <img className='logoOverlay' src={logo}></img>
            <div className='bgImage'><img src={bgImage} alt="Stormwind" /></div>
        <div className='textOverlay arsenal-sc-bold'>Enjoy yourself as you experience the wonderous locations of Azeroth!</div>
        <div> 
            {/* get all spots wrapper */}
            <div>
                {/* this div will generate a div for each spot */}

            </div>
        </div>
    </div>
    </>
)
}

export default HomePage;
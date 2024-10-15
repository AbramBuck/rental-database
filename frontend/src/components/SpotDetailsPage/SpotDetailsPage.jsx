import heroImage from '../../images/Stormwind_1.jpg';
import image2 from '../../images/Stormwind_2_tradedistrict.jpg'
import './SpotStylesPage.css';
import dummyText from '../LayoutElements/DummyText';

function SpotDetailsPage() {


    return (
        <>
        <div className='pageWrapper'>
            <div className='topTextArea'>
                <h1 className='titleText'>Name of the Spot</h1>
                <h3 className='text'>City, State, Country</h3>
            </div>
            <div className='imageArea'>
                <div className='heroImageArea'><img src={heroImage} alt="Stormwind" className='heroImage' /></div>
                <div className='sideImagesArea'>
                    <img src={image2} alt="Stormwind" className='sideImage'/>
                    <img src={image2} alt="Stormwind" className='sideImage' />
                    <img src={image2} alt="Stormwind" className='sideImage'/>
                    <img src={image2} alt="Stormwind" className='sideImage'/>
                </div>
            </div>
            <div className='detailsArea'>
                <div className='title'>Hosted by FirstName LastName</div>
                <div className='arsenal-sc-regular'>{dummyText}</div>
            </div>
            <div></div>
            <div></div>
        </div>
        </>
    )
}

export default SpotDetailsPage;
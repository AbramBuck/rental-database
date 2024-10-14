import React, { Component } from 'react';
import heroImage from '../../images/Stormwind_1.jpg';
import image2 from '../../images/Stormwind_2_tradedistrict.jpg'
import styles from './SpotDetailsPage.css';

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
            <div></div>
            <div></div>
            <div></div>
        </div>
        </>
    )
}

export default SpotDetailsPage;
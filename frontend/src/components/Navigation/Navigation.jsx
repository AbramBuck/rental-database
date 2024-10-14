import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import styles from './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
  
    return (
        <div className='topnav'>
                <div>
                <NavLink to="/">Home</NavLink>
                </div>
                {isLoaded && (
                <div className='profileBtn'>
                    <ProfileButton user={sessionUser} />
                </div>
                )}
        </div>
    );
  }
  
  export default Navigation;
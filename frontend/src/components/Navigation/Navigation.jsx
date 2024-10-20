import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './Navigation.css';
import logo from '../../images/Hearth-Havens_TextLogo.png';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <div className='topnav'>
                <div>
                <NavLink to="/"><img className='logoSm' src={logo} alt="" /></NavLink>
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
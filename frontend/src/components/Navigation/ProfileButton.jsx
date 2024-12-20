import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './ProfileButton.css';
import icon from '../../images/Hearth-Havens_Icon.png'
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateSpotFormModal from '../CreateSpotForm/CreateSpotForm';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const manageSpot = (e) => {
    e.preventDefault();
    navigate('/spots/manage');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className='createSpotLink'> 
      {!user ? " " : <OpenModalMenuItem itemText="Create A Destination" onItemClick={closeMenu} modalComponent={<CreateSpotFormModal />}/>}
      </div> 
     {!user ? " " : <img className='buttonIcon' src={icon} alt="Hearths & Havens" />}
      <button onClick={toggleMenu} className='profileButton'>
        {!user ? "Login or Signup" : user.username}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className='buttonBG'>
            {user ? <h1>Hello {user.firstName}!</h1> : ""}
            <div><p></p>Username: {user.username}</div>
            <div>Name: {user.firstName} {user.lastName}</div>
            <div>Email: {user.email}</div>
            <div><button onClick={manageSpot}>Manage Spots</button></div>
            <div><button onClick={logout}>Log Out</button></div>
          </div>
          </>
        ) : (
          <>
            <div className='buttonBG'>
              <div>
                <OpenModalButton
                  buttonText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div>
                <OpenModalButton
                  buttonText="Sign Up"
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
              {/* <li>  // If you want to use item instead of button import OpenModalMenuItem
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li> */}
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;



//style={{ color: "purple", fontSize: "50px"}}
//import { GiAlienSkull } from "react-icons/gi";
//<GiAlienSkull />
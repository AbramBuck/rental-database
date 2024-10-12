import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
//import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='buttonIcon' onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className='buttonBG'>
            <div>{user.username}</div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
            <div><button className='logoutBtn' onClick={logout}>Log Out</button></div>
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
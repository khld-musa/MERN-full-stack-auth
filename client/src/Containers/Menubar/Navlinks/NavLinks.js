import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context'
import './NavLinks.css';
import { useHistory } from 'react-router-dom';
const NavLinks = props => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  function onLgout() {
    console.log(history)
    auth.logout()
    history.push('/auth')

  }
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    {auth.isLoggedIn && (
      <>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </>
    )}



    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">Login</NavLink>
      </li>
    )}

    {auth.isLoggedIn && (
      <li>
        <button onClick={onLgout}>Logout</button>
      </li>
    )}
  </ul>
};

export default NavLinks;
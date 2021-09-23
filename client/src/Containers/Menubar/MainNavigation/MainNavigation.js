import React, { useState } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import MainHeader from '../Mainheader/Mainheader'
import NavLinks from '../Navlinks/NavLinks'
import './MainNavigation.css';
const MainNavigation = props => {
  let attachedClasses = ['SideDrawer', 'Close'];

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  if (drawerIsOpen) {
    attachedClasses = ['SideDrawer', 'Open'];
  }
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
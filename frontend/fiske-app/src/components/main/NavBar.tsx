import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  NavbarProps,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import { useUser } from '../../context/UserContext.tsx';
import styles from './css/NavBar.module.css'


//TODO: don't need to check for user if navbar is only rendered if there is a user??

/**NavBar: renders navigation for logged in user
 *
 *Props:
 * - none
 *
 *State:
 * - none
 *
 * App -> NavBar
 */
function NavBar(): React.ReactNode {
  const {user} = useUser()

  const toggle = () => setIsOpen(!isOpen);


  return (

    <div className={styles.navbarWrapper}>
      {user ?
      <Navbar expand='sm' className={`${styles.navbar} sticky-top`}>
        <NavbarBrand href='/'>Fiske</NavbarBrand>
        <div className={styles.icons}>
              <NavLink tag={Link} className={styles.houseIcon} to='/'>
                <span className='bi bi-house'></span>
              </NavLink>
              <NavLink tag={Link} className={styles.groupsIcon} to='/groups'>
                <span className='bi bi-people'></span>
              </NavLink>
          </div>
              <NavLink tag={Link} to={`/profile/${user!.id}`}>
                <img
                  src={
                    user!.profile_image_url ||
                    `${process.env.PUBLIC_URL}/DefaultHeader.jpg`
                  }
                  alt='Profile'
                  className={styles.profileImage}
                />
              </NavLink>
      </Navbar>:""
}
  </div>
);
}

export default NavBar;
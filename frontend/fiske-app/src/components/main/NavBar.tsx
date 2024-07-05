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

function NavBar(): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useUser()

  const toggle = () => setIsOpen(!isOpen);


  return (

    <div className={styles.navbarWrapper}>
      {user ?
    <Navbar expand='sm' className={`${styles.navbar} sticky-top`}>
      <NavbarBrand href='/'>Fiske</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mx-auto' navbar>
          <NavItem>
            <NavLink tag={Link} to='/'>
              <span className='bi bi-house'></span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/groups'>
              <span className='bi bi-people'></span>
            </NavLink>
          </NavItem>
          {/* Add more NavItems for additional navigation items */}
        </Nav>
        <Nav className='ml-auto' navbar>
          <NavItem>
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
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>:""
}
  </div>
);
}

export default NavBar;
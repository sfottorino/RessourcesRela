import React from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavItem,
  NavLinks,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbarElements";

import isLoggedIn from '../../services/isLoggedIn';


const Navbar = ({ toggle }) => {
  return (
    <>
      <Nav>
        <NavbarContainer>
        {!isLoggedIn() ? (
            <NavLogo to="/">RE</NavLogo>
          ):(
            <NavLogo to="/accueil">RE</NavLogo>
          )}
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about">Accueil</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="discover">Parcourir</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="services">A propos de nous</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="signup">Support</NavLinks>
            </NavItem>
          </NavMenu>
          {!isLoggedIn() ? (
            <NavBtn>
              <NavBtnLink to="signin">Se connecter</NavBtnLink>
            </NavBtn>
          ):(
            <NavBtn>
              <NavBtnLink to="logOut">Se déconnecter</NavBtnLink>
            </NavBtn>
          )}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;

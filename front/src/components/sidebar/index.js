import React from "react";
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
} from './sidebarElements';

const Sidebar = ( { isOpen, toggle}) => {
    return (
      <>
          <SidebarContainer isOpen={isOpen} onClick = {toggle}>
              <Icon onClick = {toggle}>
                  <CloseIcon />
              </Icon>
              <SidebarWrapper>
                  <SidebarMenu>
                      <SidebarLink to="about" onClick = {toggle}>
                          Accueil
                      </SidebarLink>
                      <SidebarLink to="discover" onClick = {toggle}>
                          Parcourir
                      </SidebarLink>
                      <SidebarLink to="services" onClick = {toggle}> 
                          A propos de nous
                      </SidebarLink>
                      <SidebarLink to="signup" onClick = {toggle}>
                          Support
                      </SidebarLink>
                  </SidebarMenu>
                  <SideBtnWrap>
                      <SidebarRoute to="/signin" onClick = {toggle}>Se connecter</SidebarRoute>
                  </SideBtnWrap>
              </SidebarWrapper>
          </SidebarContainer>
      </>
    );
  };
  
  export default Sidebar;
  
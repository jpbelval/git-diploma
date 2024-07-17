import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Title,
} from "./navbarElements";
import { Outlet, Link } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web'
import { hasStudentRole } from '../keycloak.js';

const Navbar = () => {
  const { keycloak } = useKeycloak()

    return (
        <>
          <Title to="/">
          🎓git-diploma
          </Title>
          <Nav>
            <Bars />
              <NavMenu>
                <NavLink to="/" >
                  home
                </NavLink>
                {hasStudentRole(keycloak.realmAccess.roles) ? (<NavLink to="/equipe">
                  équipe
                </NavLink>): (<></>)}
                {/* Second Nav */}
                {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
              </NavMenu>
              <NavBtn>
              {!!keycloak?.authenticated && (
                <button type="button" onClick={() => keycloak.logout()}>
                  Logout
                </button>
              )}
              </NavBtn>
          </Nav>
        </>
    );
};

export default Navbar;
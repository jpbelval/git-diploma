import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Title,
} from "./navbarElements";  // Assurez-vous que navbarElements définit bien NavBtn et NavBtnLink
import { Outlet, Link } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web';
import { hasStudentRole } from '../keycloak.js';

const Navbar = () => {
  const { keycloak } = useKeycloak();

  return (
    <>
      <Title to="/">
        🎓git-diploma
      </Title>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/">
            home
          </NavLink>
          {hasStudentRole(keycloak.realmAccess.roles) && (
            <NavLink to="/equipe">
              équipe
            </NavLink>
          )}
        </NavMenu>
        <NavBtn>
          {!!keycloak?.authenticated ? (
            <button style={{padding: "0px"}} onClick={() => keycloak.logout()}>
              Logout
            </button>
          ) : (
            <NavBtnLink> </NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;

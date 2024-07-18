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

  const logout = () => {
    keycloak.logout();
    window.location.href = '/'
  }
  return (
    <>
      <Title to="/">
        🎓git-diploma
      </Title>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/">
            tableau de bord
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
              se déconnecter
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

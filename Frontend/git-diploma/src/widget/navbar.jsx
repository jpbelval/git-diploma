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
import { useCallback } from 'react'

const Navbar = () => {
  const { keycloak } = useKeycloak()

  const login = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

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
                <NavLink to="/aide">
                  aide
                </NavLink>
                {/* Second Nav */}
                {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
              </NavMenu>
              <NavBtn>
                <button type="button" onClick={login}>
                  sign in
                </button>
              </NavBtn>
          </Nav>
        </>
    );
};

export default Navbar;
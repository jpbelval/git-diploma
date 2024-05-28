
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    /*background: #018849;*/
    border-bottom: 10px solid #018849;
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    padding-bottom: 0px;
    z-index: 12;
    width: 100%;
    /* Third Nav */
    /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
    color: #000000;
    display: flex;
    align-items: end;
    text-decoration: none;
    padding: 0 1rem;
    padding-top:20%;
    height: 5%;
    cursor: pointer;
    font-size: 20px;
    &.active {
        color: #FFFFFF;
        background: #018849;
    }
    &:hover {
        text-decoration: underline;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #ffffff;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: end;
    margin-right: -24px;
    padding-left:400px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
    white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: end;
    margin-right: 400px;
    /* Third Nav */
    /* justify-content: flex-end;
  width: 100vw; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    color: #000000;
    display: flex;
    align-items: end;
    text-decoration: none;
    padding: 0 1rem;
    padding-top:30%;
    height: 5%;
    cursor: pointer;
    font-size: 20px;
    &.active {
        color: #FFFFFF;
        background: #018849;
    }
    &:hover {
        text-decoration: underline;
    }
`;
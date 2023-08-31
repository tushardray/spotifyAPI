import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styled from 'styled-components';
import {Link} from "react-router-dom";

export const Nav = styled.nav`
    background: #400073;
    height: 75px;
    border: 1px solid gray;
    // border-radius: 5px;
`;

export const NavLink = styled(Link)`
    color: #f5fffa;
    font-size: 150%;
    font-family: Verdana;
    float: left;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    padding-top: 29px;
    height: 55%;
`;

export const NavButton = styled.button`
    margin-top: 20px;
    margin-right: 15px;
    display: flex;
    float: right;
`;

export const NavInput = styled.input`
    font-family: Arial;
    padding: 7px 20px;
    border-color: #003153;
    margin-top: 17px;
    margin-right: 10px;
    border-radius: 10px;
    float: right;
    align-items: center;
`;

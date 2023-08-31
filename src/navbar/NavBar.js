import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from "react";
import {
    Nav,
    NavLink,
    NavInput,
    NavButton,
} from './NavElements';
import { useNavigate } from "react-router-dom";
import {authorizeURL} from "../webPages/Callback";

const Navbar = () => {

    const [name, setName] = useState("");

    const navigate = useNavigate();

    const toSearchResults = (e) => {
        e.preventDefault();
        navigate('/SearchResults',{state:{name}});
    }

    return (
        <div>
            <Nav>
                <NavLink
                to={"/"}
                style={{"marginLeft": "15px"}}>
                    <strong> Spotify Sights </strong>
                </NavLink>

                <NavLink
                to={authorizeURL}
                style={{marginLeft: "10px"}}
                >
                    Log In
                </NavLink>

                <form onSubmit={toSearchResults}>
                    <NavButton type={"Submit"} className={"btn btn-success"}>
                        Search
                    </NavButton>

                    <NavInput
                    type={"search"}
                    placeholder={"Enter an artist to search"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </form>
            </Nav>
        </div>
    );
};

export default Navbar;
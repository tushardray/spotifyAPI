import React, {useEffect, useState} from "react";
import Navbar from "../navbar/NavBar";
import styled from 'styled-components';
import {
    GetAuthToken,
    TopSongs
} from "../functions/authorization_code_flow";
import { useNavigate } from "react-router-dom";


const local_redirect_url = "http://localhost:3000/callback";
const deployment_redirect_url = "https://react-spotify-proj.uk.r.appspot.com/callback"

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

// export const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${local_redirect_url}&scope=user-top-read%20user-read-email%20user-read-private&show_dialog=true`;
export const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${deployment_redirect_url}&scope=user-top-read%20user-read-email%20user-read-private&show_dialog=true`;

const params = new URLSearchParams(window.location.search)
const auth_code = params.get('code')
const error_keyword = params.get("error")


const Row = styled.div`
    display: flex;
`;

const Column = styled.div`
    flex: 50%;
`;


const Callback = () => {
    let [topArtists, setTopArtists] = useState({})
    let [fullArtists, setFullArtists] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {

        if (error_keyword === "access_denied") {
            navigate('/')
            return;
        }

        // Remember to change the redirect URL when you switch from web hosting to localhost:
        GetAuthToken(client_id, client_secret, auth_code, deployment_redirect_url)
            .then(token => {

                TopSongs(client_id, client_secret, token.data["access_token"], 20, "medium_term")
                    .then(resultInfo => {
                        console.log(resultInfo)
                        setTopArtists(resultInfo.data.items)
                        setFullArtists(true)
                    })
                    .catch(function (err) {
                        console.error(err)
                    })
            })
            .catch(function (err) {
                console.error(err)
            })

    }, [])


    return (
        <>
            <Navbar/>
            <div>

                {fullArtists &&
                <Row>
                    <Column style={{marginLeft: "15%"}} >

                    <br/>
                    <h1> <strong> Your Top Artists </strong> </h1>
                    <br/>


                        <span style={{fontSize: "400%"}}> {topArtists[0]["name"]} </span> <br/>
                        <span style={{fontSize: "400%"}}> {topArtists[1]["name"]} </span> <br/>
                        <span style={{fontSize: "375%"}}> {topArtists[2]["name"]} </span> <br/>
                        <span style={{fontSize: "375%"}}> {topArtists[3]["name"]} </span> <br/>
                        <span style={{fontSize: "350%"}}> {topArtists[4]["name"]} </span> <br/>
                        <span style={{fontSize: "350%"}}> {topArtists[5]["name"]} </span> <br/>
                        <span style={{fontSize: "325%"}}> {topArtists[6]["name"]} </span> <br/>
                        <span style={{fontSize: "325%"}}> {topArtists[7]["name"]} </span> <br/>
                        <span style={{fontSize: "300%"}}> {topArtists[8]["name"]} </span> <br/>
                        <span style={{fontSize: "300%"}}> {topArtists[9]["name"]} </span> <br/>
                        <span style={{fontSize: "275%"}}> {topArtists[10]["name"]} </span> <br/>
                        <span style={{fontSize: "275%"}}> {topArtists[11]["name"]} </span> <br/>
                        <span style={{fontSize: "250%"}}> {topArtists[12]["name"]} </span> <br/>
                        <span style={{fontSize: "250%"}}> {topArtists[13]["name"]} </span> <br/>
                        <span style={{fontSize: "225%"}}> {topArtists[14]["name"]} </span> <br/>
                        <span style={{fontSize: "225%"}}> {topArtists[15]["name"]} </span> <br/>
                        <span style={{fontSize: "200%"}}> {topArtists[16]["name"]} </span> <br/>
                        <span style={{fontSize: "200%"}}> {topArtists[17]["name"]} </span> <br/>
                        <span style={{fontSize: "175%"}}> {topArtists[18]["name"]} </span> <br/>
                        <span style={{fontSize: "175%"}}> {topArtists[19]["name"]} </span> <br/>

                    </Column>

                    <Column style={{marginLeft: "20%"}}>

                        <br/>
                        <h1> <strong> Your Top Genres </strong> </h1>
                        <br/>

                        <span style={{fontSize: "400%"}}> {topArtists[0]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "400%"}}> {topArtists[1]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "375%"}}> {topArtists[2]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "375%"}}> {topArtists[3]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "350%"}}> {topArtists[4]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "350%"}}> {topArtists[5]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "325%"}}> {topArtists[6]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "325%"}}> {topArtists[7]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "300%"}}> {topArtists[8]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "300%"}}> {topArtists[9]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "275%"}}> {topArtists[10]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "275%"}}> {topArtists[11]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "250%"}}> {topArtists[12]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "250%"}}> {topArtists[13]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "225%"}}> {topArtists[14]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "225%"}}> {topArtists[15]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "200%"}}> {topArtists[16]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "200%"}}> {topArtists[17]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "175%"}}> {topArtists[18]["genres"][0]} </span> <br/>
                        <span style={{fontSize: "175%"}}> {topArtists[19]["genres"][0]} </span> <br/>

                    </Column>
                </Row>
                }

            </div>
        </>
    );
}

export default Callback;

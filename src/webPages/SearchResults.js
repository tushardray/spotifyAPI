import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from "../navbar/NavBar";
import {useLocation} from 'react-router-dom';
import {
    GetToken,
    GetArtistID,
    GetTopTracks
} from "../functions/client_credentials_flow"


const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;


const SearchResults = () => {
    const location = useLocation();

    let [genre, setGenre] = useState([]);
    let [artistName, setArtistName] = useState("")
    let [topTracks, setTopTracks] = useState({})
    let [fullTracks, setFullTracks] = useState(false)
    let [notFound, setNotFound] = useState(false)

    const navbarSearchVal = location.state.name;


    useEffect(() => {

        // Retrieve the requested information using API calls:
        GetToken(client_id, client_secret)
            .then(result => {
                console.log("Created initial access token")

                // GetArtistID(Artist name, Access token)
                GetArtistID(navbarSearchVal, result.data.access_token)
                    .then(artistID => {
                        setGenre(artistID.data.artists.items[0]["genres"])
                        setArtistName(artistID.data.artists.items[0]["name"])
                        console.log("Artist ID and name have been set")

                        // GetTopTracks(ID, Access token)
                        GetTopTracks(artistID.data.artists.items[0]["id"], result.data.access_token)
                            .then(listOfTracks => {
                                setTopTracks(listOfTracks)
                                setFullTracks(true)
                                console.log("List of tracks has been recieved")
                            })
                    })
                    .catch(function (err) {
                        console.error(err)
                        setNotFound(true)
                    })

            })
            .catch(function (err) {
                console.error(err)
            })

    }, []);

    return (
        <>
            <Navbar />
            <div style={{textAlign:"center", marginTop:"20px"}}>

                {fullTracks &&
                    <div>
                        <h1> <strong> You searched for: {navbarSearchVal} </strong> </h1>
                        <h1> <strong> Showing top 10 hits for {artistName}: </strong> </h1>
                        <h1> <strong> Genre: {genre[0]} </strong> </h1>

                        <br/>


                        <div>
                            <span style={{fontSize: "350%"}}> {topTracks.data.tracks[0]["name"]} </span> <br/>
                            <span style={{fontSize: "350%"}}> {topTracks.data.tracks[1]["name"]} </span> <br/>
                            <span style={{fontSize: "325%"}}> {topTracks.data.tracks[2]["name"]} </span> <br/>
                            <span style={{fontSize: "325%"}}> {topTracks.data.tracks[3]["name"]} </span> <br/>
                            <span style={{fontSize: "300%"}}> {topTracks.data.tracks[4]["name"]} </span> <br/>
                            <span style={{fontSize: "300%"}}> {topTracks.data.tracks[5]["name"]} </span> <br/>
                            <span style={{fontSize: "275%"}}> {topTracks.data.tracks[6]["name"]} </span> <br/>
                            <span style={{fontSize: "275%"}}> {topTracks.data.tracks[7]["name"]} </span> <br/>
                            <span style={{fontSize: "250%"}}> {topTracks.data.tracks[8]["name"]} </span> <br/>
                            <span style={{fontSize: "250%"}}> {topTracks.data.tracks[9]["name"]} </span> <br/>
                        </div>
                    </div>
                }

                {notFound &&
                    <div>
                        <h1>Artist not found. Try searching for another one.</h1>
                    </div>
                }

            </div>
        </>
    )
}

export default SearchResults;
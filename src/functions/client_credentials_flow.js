import axios from "axios";

export const GetToken = async (client_id, client_secret) => {
    const accessTokenURI = "https://accounts.spotify.com/api/token";

    const tokenCall = {
        method: "post",
        mode: "cors",
        headers: {
            "Authorization": "Basic " + btoa(`${client_id}:${client_secret}`),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
            "grant_type": "client_credentials"
        },
    };

    console.log(tokenCall)

    // Retrieve the access token promise
    return axios(accessTokenURI, tokenCall)
}

export function GetArtistID(artistName, accessToken) {
    const artistURI = `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`;

    // console.log(artistURI)
    const tokenCall = {
        method: "get",
        headers: {
            "Authorization" : "Bearer " + accessToken
        }
    }

    // Retrieve the artist information object
    return axios(artistURI, tokenCall)
}

export function GetTopTracks(id, accessToken) {
    let tracksUri = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;
    let tokenCall = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    // Retrieve the list of top tracks
    return axios(tracksUri, tokenCall)
}

import axios from "axios";

export const GetAuthToken = (client_id, client_secret, code, redirect_uri) => {

    const url = "https://accounts.spotify.com/api/token";

    const tokenCall = {
        method: "post",
        mode: "cors",
        headers: {
            "Authorization": "Basic " + btoa(`${client_id}:${client_secret}`),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri
        },
    };

    return axios(url, tokenCall);

}

export const TopSongs = (client_id, client_secret, token, limit, time_range) => {
    //   Limit: Number of results found
    //   Time range: How far back in user history to check
    //   Other documentation found here:
    //   https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks

    const userInfoURL = `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${time_range}`;

    const tokenCall = {
        method: "get",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }

    return axios(userInfoURL, tokenCall)

}

from flask import redirect
from dotenv import load_dotenv
import os
import base64
from requests import post, get
import json

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

auth_string = f"{client_id}:{client_secret}"
auth_bytes = auth_string.encode("utf-8")
auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

local_redirect_uri = "http://localhost:5000/callback"
deployment_redirect_uri = "https://tushar-spotify.uk.r.appspot.com/callback"


uri = f"https://accounts.spotify.com/authorize?" \
      f"client_id={client_id}&" \
      f"response_type=code&" \
      f"redirect_uri={deployment_redirect_uri}&" \
      f"scope=user-top-read%20user-read-email%20user-read-private%20user-read-email&" \
      f"show_dialog=true"


def get_auth_token(code):

    headers = {
        "Authorization": f"Basic {auth_base64}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "authorization_code",
        "code": f"{code}",
        "redirect_uri": f"{deployment_redirect_uri}"
    }

    json_token = post("https://accounts.spotify.com/api/token", headers=headers, data=data)
    result = json.loads(json_token.content)

    #   If user selects "cancel", the expected key token won't be found.
    #   The exception block redirects user back to home page in case of cancellation.
    try:
        access_token = result["access_token"]
    except KeyError:
        return redirect("localhost:5000")

    return access_token


def top_songs(code, limit, time_range):
    #   Limit: Number of results found
    #   Time range: How far back in user history to check
    #   Other documentation found here:
    #   https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
    query = f"?limit={limit}&time_range={time_range}"
    headers = {
        "Authorization": f"Bearer {get_auth_token(code)}",
        "Content_Type": "application/json"
    }

    #   Change "artists" in the get URI to "tracks" to get user's top tracks
    json_artists = get(f"https://api.spotify.com/v1/me/top/artists{query}", headers=headers)
    print(f"JSON ARTISTS: {json_artists}")
    load_artists = json.loads(json_artists.content)
    return load_artists

from flask import Flask, render_template, request, redirect
from client_credentials_flow import get_token, search_for_artist, get_songs_by_artist
from authorization_code_flow import top_songs, uri
from classes import TopSearchedSongs

app = Flask(__name__)


@app.route('/')
def hello_world():  # put app's code here
    testList = ["hi", "bye", "three"]
    return render_template("index.html", title="Spotify search", uri=uri, testlist=testList)


@app.route("/displayRankings", methods=["POST"])
def display_rankings():
    artist_requested = request.form["artist_name"]
    artist_exists_bool = True

    access_token = get_token()
    search_result = search_for_artist(access_token, artist_requested)  # Request made to Spotify API for artist songs

    #   If no artist is found, return None and tell Jinja artist doesn't exist.
    #   Then display the HTML file with the nonexistent artist condition
    if search_result is None:
        artist_exists_bool = False
        return render_template("displayRankings.html", artist_exists=artist_exists_bool, title="Artist not found",
                               artist_name=artist_requested)
    ID = search_result["id"]
    songs = get_songs_by_artist(access_token, ID)

    ranking = []

    #   Place every song in a list to send to HTML file:
    for position, song in enumerate(songs):
        ranking.append(song["name"])

    #   Loads the top 10 songs into the class. They are retrieved in the HTML file:
    songs_object = TopSearchedSongs(ranking[0], ranking[1], ranking[2], ranking[3], ranking[4],
                                    ranking[5], ranking[6], ranking[7], ranking[8], ranking[9])

    return render_template("displayRankings.html", artist_exists=artist_exists_bool, rankings_obj=songs_object,
                           title="Search results",
                           artist_name=artist_requested)


@app.route("/callback")
def callback():
    code = request.args.get("code")
    cancellation = request.args.get("error")
    if cancellation == "access_denied":
        return redirect("/")

    top_artists_dict = top_songs(code, 20, "medium_term")

    top_artists_list = []
    top_genres_list = []

    try:
        for item in top_artists_dict["items"]:
            top_artists_list.append(item["name"])
            top_genres_list.append(item["genres"])
    except KeyError:
        return redirect(uri)

    return render_template("callback.html", title="Your top 20",
                           artists_object=top_artists_list, genres_object=top_genres_list)


if __name__ == '__main__':
    app.run()

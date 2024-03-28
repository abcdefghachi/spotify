import React, { useEffect } from "react";
import "./../styles/Body.css";
import { AiFillClockCircle } from "react-icons/ai";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          followers: response.data.followers.total,
          image: response.data.images[0].url, // Corrected property name
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };

        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    if (selectedPlaylistId && token) {
      getInitialPlaylist();
    }
  }, [token, selectedPlaylistId, dispatch]);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + " : " + (seconds < 10 ? "0" : "") + seconds;
  };

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    try {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 204) {
        const currentlyPlaying = {
          id,
          name,
          artists,
          image,
        };

        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      } else {
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      }
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  return (
    <div headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist my-1 mx-2 d-flex align-items-center gap-4">
            <div className="image">
              <img
                src={selectedPlaylist.image}
                alt=""
                style={{ width: "250px" }}
              />
            </div>

            <div
              className="details text-light d-flex flex-column gap-4"
              style={{ color: "#e0dede" }}
            >
              <span className="type">PLAYLIST</span>
              <h1 className="title text-light fs-1 fw-bolder">
                {selectedPlaylist.name}
              </h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>

          <div className="list">
            <div
              className="header-row row"
              headerBackground={headerBackground}
              style={{ background: headerBackground ? "#000000dc" : "none" }}
            >
              <div className="col-1">
                <span>#</span>
              </div>
              <div className="col-6">
                <span>TITLE</span>
              </div>
              <div className="col-4">
                <span>ALBUM</span>
              </div>
              <div className="col-1">
                <AiFillClockCircle />
              </div>
            </div>

            <div className="tracks d-flex flex-column">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => (
                  <div
                    className="row"
                    key={id}
                    onClick={() =>
                      playTrack(
                        id,
                        name,
                        artists,
                        image,
                        context_uri,
                        track_number
                      )
                    }
                  >
                    <div className="col-1 col-content">
                      <span>{index + 1}</span>
                    </div>
                    <div className="col-6 col-content details d-flex gap-1">
                      <div className="image">
                        <img src={image} alt="track-img" />
                      </div>
                      <div className="info d-flex flex-column">
                        <span className="name">{name}</span>
                        <span className="artists">{artists}</span>
                      </div>
                    </div>
                    <div className="col-4 col-content">
                      <span>{album}</span>
                    </div>
                    <div className="col-1 col-content">
                      <span>{msToMinutesAndSeconds(duration)}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

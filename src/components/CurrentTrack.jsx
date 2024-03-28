import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.item) {
          const { item } = response.data;
          const currentlyPlaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url,
          };

          dispatch({
            type: reducerCases.SET_PLAYING,
            currentlyPlaying,
          });
        } else {
          dispatch({
            type: reducerCases.SET_PLAYING,
            currentlyPlaying,
          });
        }
      } catch (error) {
        console.error("Error fetching currently playing track:", error);
      }
    };

    if (token) {
      getCurrentTrack();
    }
  }, [token, dispatch]);

  return (
    <div>
      {currentlyPlaying && (
        <div className="track d-flex align-items-center gap-3">
          <div className="track-image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track-info d-flex flex-column">
            <h6 className="text-light">{currentlyPlaying.name}</h6>
            <h6 style={{ color: "#b3b3b3" }}>
              {currentlyPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

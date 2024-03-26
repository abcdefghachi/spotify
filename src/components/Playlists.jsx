import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import "../styles/Playlists.css";

export default function Playlist() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        const { items } = response.data;
        const playlistsData = items.map(({ name, id }) => ({ name, id }));
        dispatch({
          type: reducerCases.SET_PLAYLISTS,
          playlists: playlistsData,
        });
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    if (token) {
      getPlaylistData();
    }
  }, [token, dispatch]);

  return (
    <div>
      <ul>
        {playlists && playlists.map(({ name, id }) => <li key={id}>{name}</li>)}
      </ul>
    </div>
  );
}

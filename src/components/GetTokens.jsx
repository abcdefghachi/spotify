import React from "react";
import "./../styles/GetTokens.css";
import { Container } from "react-bootstrap"; // Import Container from react-bootstrap

export default function Login() {
  const handleClick = () => {
    const clientId = "d0300acf729249f999aaf25986a23d39";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  };
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 m-auto">
      <img
        className="spotify-logo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
        alt="spotify-logo"
      />
      <button
        className="my-5 mx-5 py-2 border-0 rounded-pill connect-button"
        onClick={handleClick}
      >
        Connect Spotify
      </button>
    </Container>
  );
}

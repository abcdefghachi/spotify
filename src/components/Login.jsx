import React from "react";
import { Container } from 'react-bootstrap'; // Import Container from react-bootstrap

export default function Login() {
  const handleClick = ()  => {
    const clientId = "d0300acf729249f999aaf25986a23d39"
    const redirectUrl = "http://localhost:3000/"
    const apiUrl = "https://accounts.spotify.com/authorize"
    const scope = ["user-read-email",
    "user-read-private" , 
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing" , 
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played"]
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join( " ")}&response_type=tolen&show_daialog=true`
  }
  return (
    <Container className="d-flex flex-column vh-100 vw-100">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
        alt="spotify-logo"
        style={{height: '20vh'}}
      />
      <button className="my-5 mx-5 py-2 border-0 rounded-pill"
      onClick={handleClick}
      style={{backgroundColor : 'black',
      color:'#49f585',
      fontSize: '1.4rem',
      cursor: 'pointer',
      }}>Connect Spotify</button>
    </Container>
  );
}

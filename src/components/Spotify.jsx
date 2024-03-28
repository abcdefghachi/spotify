import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import Body from "./Body";
import Footer from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 290
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
        };

        dispatch({ type: reducerCases.SET_USER, userInfo });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (token) {
      getUserInfo();
    }
  }, [token, dispatch]);

  return (
    <div
      className="wrapper d-grid"
      style={{
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
        gridTemplateRows: "85vh 15vh",
      }}
    >
      <div
        className="spotify-body h-100 w-100 d-grid"
        style={{
          gridTemplateColumns: "25vw 75vw",
          background: "linear-gradient(transparent, rgba(0,0,0,1))",
          backgroundColor: "#292929",
        }}
      >
        <Sidebar />
        <div
          className="body h-100 w-100"
          style={{
            overflow: "auto",
            scrollbarWidth: "none", // Firefox
            "-ms-overflow-style": "none", // Internet Explorer 11
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, Opera
            },
          }}
          ref={bodyRef}
          onScroll={bodyScrolled}
        >
          <NavBar navBackground={navBackground} />{" "}
          {/* Pass the navBackground prop */}
          <div className="contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotify-footer">
        <Footer style={{ overflow: "fixed" }} />
      </div>
    </div>
  );
}

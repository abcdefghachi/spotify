import React from "react";
import "./../styles/Navbar.css";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";

export default function NavBar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  return (
    <div
      className="navbar-wrapper d-flex justify-content-between align-items-center"
      navBackground={navBackground}
      style={{ background: navBackground ? "rgba(0,0,0,0.7)" : "none" }}
    >
      <div className="search-bar bg-white d-flex align-items-center rounded-pill">
        <FaSearch />
        <input type="text" placeholder="Artists , songs, poscast" />
      </div>

      <div className="avatar bg-dark py-1 px-3 d-flex justify-content-center align-items-center rounded-pill">
        <a
          href=""
          className="d-flex justify-content-center align-items-center gap-2 text-light fw-bold text-decoration-none"
        >
          <FaRegUserCircle />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  );
}

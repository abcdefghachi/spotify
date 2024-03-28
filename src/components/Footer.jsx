import React from "react";
import "./../styles/Footer.css";
import CurrentTrack from "./CurrentTrack";
import PlayerControl from "./PlayerControl";
import Volume from "./Volume";

export default function Footer() {
  return (
    <div className="footer-wrapper w-100 h-100">
      <CurrentTrack />
      <PlayerControl />
      <Volume />
    </div>
  );
}

import React from 'react'
import  {IoLibrary} from 'react-icons/io5'
import { MdHomeFilled , MdSearch } from 'react-icons/md';
import './../styles/Sidebar.css'
import Playlist from './Playlists';


export default function Sidebar() {
  return (
    <div style={{backgroundColor :'black' , color : '#b3b3b3'}}>
      <div className="links d-flex flex-column">
        <div className="logo my-3 ms-3">
        <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        alt="spotify-logo"
        style={{width :'10rem' }}
      />
        </div>
        <div>
          <ul className='list-unstyled d-flex flex-column gap-4 ps-3 my-2'
          >
            <li className='d-flex gap-3'>
              <MdHomeFilled />
              <span>Home</span></li>
            <li className='d-flex gap-3'>
              <MdSearch />
              <span>Search</span></li>
            <li className='d-flex gap-3'>
              <IoLibrary />
              <span>Your Libruary</span></li>
          </ul>
        </div>

       <Playlist />
      </div>
    </div>
  )
}

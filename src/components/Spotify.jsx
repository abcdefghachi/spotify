import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function Spotify() {
    const [{ token }, dispatch] = useStateProvider();

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const { data } = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                });
                const userInfo = {
                    userId: data.id,
                    userName: data.display_name
                };
                dispatch({ type: reducerCases.SET_USER, userInfo });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        if (token) {
            getUserInfo();
        }
    }, [token, dispatch]);

    return (
        <div className="wrapper d-grid" style={{ gridTemplateRows: '85vh 15vh' }}>
            <div className="spotify-body h-100 w-100 d-grid" style={{ gridTemplateColumns: '25vw 75vw', background: 'linear-gradient(transparent, rgba(0,0,0,1))', backgroundColor: 'rgb(32,87,100)' }}>
                <Sidebar />
                <div className="body h-100 w-100">
                    <NavBar />
                    <div className="contents">
                        <Body />
                    </div>
                </div>
            </div>
            <div className="spotify-footer">
                <Footer />
            </div>
        </div>
    );
}

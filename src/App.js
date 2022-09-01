import React, { useState, useEffect } from 'react';
import './App.css';
import writing from './images/animewriting.GIF';
import cafe2 from './images/cafe2.gif';
import TimerFunctionality from './TimerFunctionality';
import LoginButton from './LoginButton';
import CurrentTask from './CurrentTask';
import MusicPlayer from './MusicPlayer';
import ToDoList from './ToDoList';
import axios from 'axios';

function App() {
  // boolean to check if user is authenticated 
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  // spotify API stuff
  const CLIENT_ID = 'ce47b2bc1f5544a09a87eddda93c13df';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  // get current token from URL
  const getToken = () => {
    // gets URL
    let urlParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    // extracts access token from URL
    let token = urlParams.get('access_token');
    return (token);
  }

  useEffect(() => {
    // current url
    const hash = window.location.hash;
    if (hash) {
      // set newToken to access_token part of current url
      let newToken = getToken();
      localStorage.clear();
      // set accessToken key equal to newToken value in local storage 
      localStorage.setItem('accessToken', newToken)
    }
  }, []);

  // user needs to be authenticated (logged in to spotify) before being able to access the playlist/tracks
  // fix by creating an isLoggedIn boolean to check if authenticated before trying to access tracks
  let isRedirected = window.performance.navigation.type; // 1 if page was refreshed, 0 if page was redirected
  if (!isLoggedIn && isRedirected === 0) {
    setIsLoggedIn(true); // changes isLoggedIn to true if page was redirected (auth succeeds)
  }
  // FIX MEEEEEE
  // the seeing if u were redirected to check login thing is a (kinda smart but) terrible way to do this please fix
  // its actually starting out as true when the app first loads so..... not good at all 

  return (
    <div className='app__container'>
      <p className='app__headerWords'>☕ Let's Get to Work ☕</p>
      <img src={cafe2} className='app__cafeGif' />
      <div className='app__taskContainer'>
        <CurrentTask />
        <div className='app__toDoList'>
          <ToDoList />
        </div>
      </div>
      <div className='app__timerContainer'>
        <TimerFunctionality />
      </div>
      <div className='app__musicContainer'>
        {/* conditionally render login button based on if user is already logged in or not */}
        {/* only render login button when isLoggedIn is false */}
        { !isLoggedIn && <LoginButton CLIENT_ID={CLIENT_ID} REDIRECT_URI={REDIRECT_URI} AUTH_ENDPOINT={AUTH_ENDPOINT} RESPONSE_TYPE={RESPONSE_TYPE} /> }
        {/* only render play music button when isLoggedIn is true  */}
        { isLoggedIn && <MusicPlayer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> }
      </div>
    </div>
  );
}

export default App;


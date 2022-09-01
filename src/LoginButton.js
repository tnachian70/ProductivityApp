import React, { useState, useEffect } from 'react';

// lets user log in to spotify
function LoginButton(props) {
    // return link to spotify user authorization page
    return (
      <div>
        <a href={`${props.AUTH_ENDPOINT}?client_id=${props.CLIENT_ID}&redirect_uri=${props.REDIRECT_URI}&response_type=${props.RESPONSE_TYPE}&show_dialogue=true`} className='musicPlayer__loginButton' onClick={props.onClick}>Log In to Spotify</a>
      </div>
    );
  }

  export default LoginButton;

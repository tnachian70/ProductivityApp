import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css'
import axios from 'axios';
import NextSongButton from './NextSongButton';
import PauseMusicButton from './PauseMusicButton';
import PrevSongButton from './PrevSongButton';

const playlist_endpoint = 'https://api.spotify.com/v1/playlists/3WLDIcG4Cx2UOPy0rbFhQn/tracks';

// make an array of indices 0-99 in a random order to index and play random songs from playlist
let songIndexArray = [];
for (let i = 0; i < 100; i++) {
    // generates a random number 0-99 
    let randint = Math.floor(Math.random() * 100);
    // appends it to array
    if (!(songIndexArray.includes(randint))){
        songIndexArray.push(randint);
    }
}

// global audio object cause thats the only way the pause method works 
const currentTrackAudio = new Audio('');

// lets user access playlist
function MusicPlayer(props) {
    // use to set token
    let [token, setToken] = useState('');
    // data from spotify
    let [data, setData] = useState({});
    // boolean to check if API call succeeded
    let [apiCallSuccess, setApiCallSuccess] = useState(false);
    // boolean to check if music should be playing
    let [isPlaying, setIsPlaying] = useState(false);
    // song thats currently playing
    let [currentTrack, setCurrentTrack] = useState('');
    // pointer to know which song array index we're at 
    let [songIndex, setSongIndex] = useState(0);
    // boolean to check if play button has been clicked once 
    let [didPlay, setDidPlay] = useState(false);
    // url of 30sec preview of current song
    let [trackPreviewURL, setTrackPreviewURL] = useState('');

    useEffect(() => {
        // sets token state variable to the accessToken value in local storage 
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'));
        }
    }, [token]); // useEffect runs whenever the state of token is updated (!!!)


    // TODO: make another useEffect to check if access token is valid? or do it in the above useEffect?


    function handleGetPlaylist() {
        // initiates GET request towards playlist endpoint
        axios.get(playlist_endpoint, {
            headers: {
                Authorization: "Bearer " + token,
            },
        }) 
        // uses the outcome of the promise
        .then((response) => {
            // if promise is resolved, set data state variable to the response from the API 
            // and set apiCallSuccess state variable to true 
            setApiCallSuccess(true);
            setData(response.data);
        })
        // if promise is rejected, console log the error 
        .catch((error) => {
            console.log('API call error: ', error.response);
        });
    };

    let getSong = () => {
        // sets current track to a random song (song at index of current songIndex in songIndexArray) and sets current track
        // preview URL to the preview_url of that song as long as API call succeeds
        if (apiCallSuccess) { 
            setCurrentTrack(data.items[songIndexArray[songIndex]].track.name);
            setTrackPreviewURL(data.items[songIndexArray[songIndex]].track.preview_url);
        }
    }

    // update currentTrackAudio src to current track preview URL whenever track preview URL changes 
    // (so whenever getSong is called)
    useEffect(() => {
        // every time trackPreviewURL changes, update the currentTrackAudio src
        currentTrackAudio.src = trackPreviewURL; 
        // every time isPlaying changes, call either the play or pause method on the Audio object 
        if (isPlaying) {
            currentTrackAudio.play();
        } else {
            currentTrackAudio.pause();
        }
    }, [trackPreviewURL, isPlaying]);
    // ^ useEffect fixes the song restarting on every rerender issue 

    // track preview continues to loop if no new track selected
    currentTrackAudio.loop = true;

    // OLD CODE THAT USED TO WORK BUT IT GAVE ME PROBS SO NOW IM USING ABOVE USEEFFECT INSTEAD:
    // play song on first click of play button
    // if (didPlay && isPlaying) {
    //     currentTrackAudio.play();
    // }
    // *****************************
    // start or stop audio when play or pause button clicked
    // this code seems redundant for the play method (and it probably is) but pause does not work w/o it <333
    // *****************************
    // useEffect(() => {
    //     if (isPlaying) {
    //         currentTrackAudio.play();
    //         console.log('song should be playing');
    //     } else {
    //         currentTrackAudio.pause();
    //         console.log('song should be paused');
    //     }
    // }, [isPlaying]);
    // ******************************
    // useEffect(() => {
    //     if (!isPlaying) {
    //         currentTrackAudio.pause();
    //     }
    // }, [isPlaying]);


    // track should fade out at the end of each run
    const fadePoint = currentTrackAudio.duration - 2; // start fading 2sec before end of track
    // // const fadePoint = 27;
    // // reduce volume ever 200ms if song is past fadePoint and volume is greater than 0
    const fadeAudio = setInterval(() => {
        if (currentTrackAudio.currentTime >= fadePoint && currentTrackAudio.volume > 0) {
            currentTrackAudio.volume -= .1;
            console.log('inside fadeout if'); // not executing 
        } else {
            currentTrackAudio.volume = 1;
        }
        if (currentTrackAudio.volume < .003) {
            clearInterval(fadeAudio);
        }
        clearInterval(fadeAudio);
    }, 200);

    // call the getSong function any time songIndex is updated 
    useEffect(() => {
        // finds track at current index in songIndexArray and sets currentTrack to that song 
        getSong();
        // start from beginning of current song
        currentTrackAudio.currentTime = 0;
    }, [songIndex])

    // when user clicks on play button, increment song index, make spotify API call, and set
    // isPlaying state variable to true 
    const handlePlay = () => {
        // only get new song the FIRST time play button is clicked
        if (!didPlay) {
            setSongIndex(songIndex + 1);  
        }
        setIsPlaying(true);
        setDidPlay(true);
    }
    
    return (
        <div>
            <div className='musicPlayer__container'>
                <button className='test-button' onClick={handleGetPlaylist}>get playlist from spotify API</button>
                <PrevSongButton songIndex={songIndex} setSongIndex={setSongIndex} getSong={getSong} />
                { isPlaying ? <PauseMusicButton setIsPlaying={setIsPlaying} /> : <button className='musicPlayer__playButton' onClick={handlePlay}>▶</button> }
                <NextSongButton apiCallSuccess={apiCallSuccess} data={data} isPlaying={isPlaying} getSong={getSong} songIndex={songIndex} setSongIndex={setSongIndex} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} /> 
                { isPlaying && <div className='musicPlayer__currentTrack'>♪ Now Playing: {currentTrack} ♪</div> }
            </div>
        </div>

    );
};

export default MusicPlayer;

// current flow:
// after logging in, play button appears
// onClick for play button makes spotify API call, calls function that selects a current track and
// renders "Now Playing: ", and sets isPlaying state variable to true
// when isPlaying is true, play button is replaced by pause button
// when pause button is clicked, play button returns
// :) 
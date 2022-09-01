import React, { useState, useEffect } from 'react';

function NextSongButton(props) {

    const handleNextSong = () => {
        // increment song index
        props.setSongIndex(props.songIndex + 1);
    } 

    return (
        <div>
            <button className='musicPlayer__nextButton' onClick={handleNextSong}>&#x21e8;</button>
        </div>
    );
}

export default NextSongButton;


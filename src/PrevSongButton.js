import React, { useState, useEffect } from 'react';

function PrevSongButton(props) {

    const handlePrevSong = () => {
        // decrement song index if we're not at the first song
        if (props.songIndex > 0) {
            props.setSongIndex(props.songIndex - 1);
        }
    }

    return (
        <div>
            <button className='musicPlayer__prevButton' onClick={handlePrevSong}>&#x21e6;</button>
        </div>
    )
}

export default PrevSongButton;
import React, { useState, useEffect } from 'react';

function PauseMusicButton(props) {
    const handlePause = () => {
        props.setIsPlaying(false);
    }
    return (
        <div>
            <button className='musicPlayer__pauseButton' onClick={handlePause}>═</button>
        </div>
    )
};

export default PauseMusicButton;
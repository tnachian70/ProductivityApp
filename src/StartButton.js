import React, { useState, useEffect } from 'react';


function StartButton (props) {
    return (
        <div>
            <button className='timer__startButton' onClick={props.onClick}>Start Timer</button>
        </div>
    );
}

export default StartButton;
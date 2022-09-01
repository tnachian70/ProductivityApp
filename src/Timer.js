import React, { useState, useEffect } from 'react';

function Timer (props) {
    return (
        <div>
            <h1 className='timer__actualTimer'>{props.minutes}:{String(props.seconds).padStart(2, '0')}</h1>
        </div>
    );
}

export default Timer;
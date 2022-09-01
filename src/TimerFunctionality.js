import React, { useState, useEffect } from 'react';
import './TimerFunctionality.css';
import ding from './dingsound.wav';
import ding2 from './ding2.mp3';
import Timer from './Timer';
import TimerInput from './TimerInput';
import StartButton from './StartButton';

const dingSound = new Audio(ding2);

function TimerFunctionality() {
    // set state of timer
    let [seconds, setSeconds] = useState(0);
    let [minutes, setMinutes] = useState('');
    let [isStart, setIsStart] = useState(false);
    // boolean to show whether or not "session complete" message should appear
    let [showMessage, setShowMessage] = useState(false);
    // user input in timer 
    let [timerInput, setTimerInput] = useState('');

    // setter method to show time the user sets
    let setTime = (e) => {
        setMinutes(e.target.value);
        setTimerInput(e.target.value);
        setShowMessage(false);
    };

    // start countdown when Enter button is pressed
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setIsStart(true);
        }
    };

    // start countdown when isStart is true 
    useEffect(() => {
        if (isStart) {
            // when isStart changes to true, implement timer functionality 
            let timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1)
                } 
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        setIsStart(false); // allows someone to set timer a second time w/o refreshing 
                        dingSound.play(); // play drriiinnng audio
                        setShowMessage(true); // show "session complete" message
                        setTimerInput('');
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            clearInterval(timer);
        }, 1000)
        } else {
            // when isStart changes to false, set seconds and minutes to 0
            setSeconds(0);
            setMinutes(0);
        }
    }, [isStart, seconds]); // callback is triggered when state of dependencies change

    
    // when user clicks on "Clear Timer" button, change isStart to false, which triggers the above useEffect that sets sec and min to 0
    const handleClearTimer = () => {
        setIsStart(false);
    }

    // show time left on timer in website tab when timer is running (when isStart is true)
    useEffect(() => {
        if (isStart) {
            document.title = `${minutes}:${String(seconds).padStart(2, '0')}`;
        } else {
            document.title = "Tamar's Productivity App";
        };
    }, [seconds, minutes]);

    return (
        <div className='timer__container'>
            {/* pass minutes and seconds as props to TimerInput and Timer components */}
            <TimerInput minutes={minutes} onChange={setTime} onKeyPress={handleKeyPress} timerInput={timerInput} /> 
            { showMessage ? 
                <div className='timer__completeMessage'>Focus Session Complete!</div> : 
                <Timer minutes={minutes} seconds={seconds} /> }
            { isStart ? 
                <button className='timer__clearButton' onClick={handleClearTimer}>Clear Timer</button> : 
                <StartButton onClick={() => setIsStart(true)} /> }
        </div>
    );
}

export default TimerFunctionality;
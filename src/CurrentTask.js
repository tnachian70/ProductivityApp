import React, { useState, useEffect } from 'react';
import './CurrentTask.css';
import SubmittedTask from './SubmittedTask';

function CurrentTask() {
  let [userDidSubmit, setUserDidSubmit] = useState(false);
  let [currentTask, setCurrentTask] = useState('');

  // handle user submitting input with Enter key 
  let handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setUserDidSubmit(true);
    }
  };

  // as user inputs task, assign value to currentTask state variable 
  let setTask = (e) => {
    setCurrentTask(e.target.value);
  }

  // conditionally render either input field for submitting new task or current focus 
  // task depending on whether userDidSubmit is true or not (whether or not user has 
  // clicked submit button)
  if (userDidSubmit) {
    return (
      <SubmittedTask currentTask={currentTask} setUserDidSubmit={setUserDidSubmit} />
    )
  } else {
    return (
      <div className='currentTask__container'>
        <div className='currentTask__prompt'>What is your current focus task?</div>
        <input className='currentTask__input' onChange={setTask} onKeyPress={handleKeyPress} placeholder='current focus task' />
        <button className='currentTask__submitButton' onClick={() => setUserDidSubmit(true)}>Submit</button> 
      </div>
    )
  }
};

export default CurrentTask;
import React, { useState, useEffect } from 'react';

// lets user set timer input
function TimerInput(props) {
    return (
      <div>
        <div className='timerInput__prompt'>Set Focus Timer:</div>
        <input className='timerInput__input' type="number" min="0" step="1" 
          onChange={props.onChange} 
          onKeyPress={props.onKeyPress} 
          value={props.timerInput} />
        {/* need to add hours somehow lmao */}
      </div>
    )
  }

  export default TimerInput;
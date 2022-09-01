import React, { useState, useEffect } from 'react';

function SubmittedTask(props) {
    return (
        <div className='currentTask__submittedTaskContainer'>
            <div className='currentTask__label'>Current Focus Task:</div>
            <div className='currentTask__submittedTask'>{props.currentTask}</div>
            <button className='currentTask__newTaskButton' onClick={() => props.setUserDidSubmit(false)}>New Task</button>
        </div>
    )
}

export default SubmittedTask;
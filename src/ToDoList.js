import React, { useState, useEffect } from 'react';
import './ToDoList.css';

function ToDoList() {
    let [userInput, setUserInput] = useState('');
    let [taskList, setTaskList] = useState([]);
    let [showAddItem, setShowAddItem] = useState(false);

    const handleSubmit = () => {
        // check if user input is empty
        if (userInput !== '') {
            // if its not empty, create an object for each submitted input
            const userInputObj = {
                // unique id for each input
                id: Math.floor(Math.random() * 100),
                // property to store user input
                value: userInput
            };
            // update task list with the newly added task
            setTaskList(prevArr => [...prevArr, userInputObj]);
            // reset user input 
            setUserInput('');
            // show plus button again
            setShowAddItem(false);
        }
    }

    const handleChange = (e) => {
        // when input field changes, set the userInput state var to the new value
        setUserInput(e.target.value);
    }

    // submit task when Enter button is pressed
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div>
            <p className='ToDo__header'>Tasks for Later:</p>
            {showAddItem ? 
            <div className='ToDo__addItemContainer'>
                <input className='ToDo__userInput' placeholder='add item' value={userInput} onChange={handleChange} onKeyPress={handleKeyPress} />
                <button className='ToDo__submitTaskButton' onClick={handleSubmit}>Add</button>
            </div> :
            <div className='ToDo__notAddingItemsContainer'>
                <button className='ToDo__plusTaskButton' onClick={() => setShowAddItem(true)}>+</button>
                {taskList.length >= 1 ? 
                <button className='ToDo_clearTasksButton' onClick={() => setTaskList([])}>Clear Tasks</button> : 
                null}
            </div>}
            <div className='ToDo__itemsContainer'>
                {taskList.map(item => 
                    <div>
                        <input type='checkbox' name='todo_item' className='css-checkbox' />
                        <label for='todo_item' className='ToDo_taskItem' key={item.id}>{item.value}</label>
                    </div>)}
            </div>
        </div>
    )
}

export default ToDoList;
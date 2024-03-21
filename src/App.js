import React, { useState } from 'react';
import './App.css';
import { FaTrash } from 'react-icons/fa'; 
import { FiAlignLeft } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { GoPlus } from "react-icons/go"
import { CgLoadbar } from "react-icons/cg"
import { FaRegCommentAlt } from "react-icons/fa";

function App() {
  // State for managing tasks
  const [tasks, setTasks] = useState({
    toDo: [],
    inProgress: [],
    review: [],
    done: []
  });

  // State for managing new tasks
  const [newTasks, setNewTasks] = useState({
    toDo: '',
    inProgress: '',
    review: '',
    done: ''
  });

  // State for managing display of delete icons
  const [showDeleteIcons, setShowDeleteIcons] = useState({
    toDo: {},
    inProgress: {},
    review: {},
    done: {}
  });

  // State for managing display of add task input
  const [showAddInput, setShowAddInput] = useState({
    toDo: false,
    inProgress: false,
    review: false,
    done: false
  });

  // Function to handle input change for new tasks
  const handleInputChange = (e, status) => {
    const value = e.target.value;
    setNewTasks(prevState => ({
      ...prevState,
      [status]: value
    }));
  };

  // Function to add a new task
  const handleAddTask = (status) => {
    if (newTasks[status].trim() !== '') {
      const newTaskObject = { id: tasks[status].length + 1, title: newTasks[status], status: status };
      setTasks(prevState => ({
        ...prevState,
        [status]: [...prevState[status], newTaskObject]
      }));
      setNewTasks(prevState => ({
        ...prevState,
        [status]: ''
      }));
      setShowDeleteIcons(prevState => ({
        ...prevState,
        [status]: { ...prevState[status], [newTaskObject.id]: false }
      }));
      setShowAddInput(prevState => ({
        ...prevState,
        [status]: false
      }));
    }
  };

  // Function to handle drag start event
  const handleDragStart = (e, id, status) => {
    e.dataTransfer.setData('taskId', id);
    e.dataTransfer.setData('taskStatus', status);
  };

  // Function to handle drop event
  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    const taskStatus = e.dataTransfer.getData('taskStatus');
    
    // Ensure taskStatus is defined before proceeding
    if (taskStatus !== status && tasks[taskStatus]) {
      const updatedTasks = tasks[taskStatus].filter(task => task.id.toString() !== taskId);
      const droppedTask = tasks[taskStatus].find(task => task.id.toString() === taskId);
      
      // Ensure droppedTask is defined before proceeding
      if (droppedTask) {
        droppedTask.status = status;
        setTasks(prevState => ({
          ...prevState,
          [taskStatus]: updatedTasks,
          [status]: [...prevState[status], droppedTask]
        }));
      }
    }
  };

  // Function to handle task deletion
  const handleDeleteTask = (id, status) => {
    const updatedTasks = tasks[status].filter(task => task.id !== id);
    setTasks(prevState => ({
      ...prevState,
      [status]: updatedTasks
    }));
  };

  // Function to toggle display of delete icon
  const toggleDeleteIcon = (id, status) => {
    setShowDeleteIcons(prevState => ({
      ...prevState,
      [status]: { ...prevState[status], [id]: !prevState[status][id] }
    }));
  };

  // Function to toggle display of add task input
  const toggleAddInput = (status) => {
    setShowAddInput(prevState => ({
      ...prevState,
      [status]: !prevState[status]
    }));
  };

  // Function to generate random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  

  return (
    <div className="App">
      <div className="container">
        {/* To Do Section */}
        <div className="section"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'toDo')}>
          <div className="card">
            <div className='title-div'>
              <h2>To Do</h2>
              <p><BsThreeDots /></p> 
            </div>
            <div className="task-list">
              {tasks.toDo.map(task =>
                <div key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, 'toDo')}
                  className="task">
                  <div className="task-content">
                  <CgLoadbar style={{ color: getRandomColor(), fontSize: '60' }} />
                    <p>{task.title}</p>
                    {showDeleteIcons.toDo[task.id] && (
                      <FaTrash className="icon" onClick={() => handleDeleteTask(task.id, 'toDo')} />
                    )}
                  
                  </div>
                  <div className="align-left-icon">
                    <FiAlignLeft onClick={() => toggleDeleteIcon(task.id, 'toDo')} />
                    <FaRegCommentAlt style={{marginLeft:"10px", fontSize:"12px"}} />
                  </div>
                  
                </div>
              )}
              {showAddInput.toDo ? (
                <div className="add-task1">
                  <input
                    type="text"
                    value={newTasks.toDo}
                    onChange={(e) => handleInputChange(e, 'toDo')}
                    placeholder="Enter task"
                  />
                  <button onClick={() => handleAddTask('toDo')}>Add</button>
                </div>
              ) : (
                <div className="add-task">
                     
                  <GoPlus className="icon" onClick={() => toggleAddInput('toDo')} />
                  <p>Add a card</p>
                  
                </div>
                
              )}
              
            </div>
          </div>
        </div>

        {/* In Progress Section */}
        
        <div className="section"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'inProgress')}>
          <div className="card">
            <div className='title-div'>
              <h2>In Progress</h2>
              <p><BsThreeDots /></p> 
            </div>
            <div className="task-list">
              {tasks.inProgress.map(task =>
                <div key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e,task.id, 'inProgress')}
                  className="task">
                  <div className="task-content">
                  <CgLoadbar style={{ color: getRandomColor(), fontSize: '60px' }} />
                    <h4>{task.title}</h4>
                    {showDeleteIcons.inProgress[task.id] && (
                      <FaTrash className="icon" onClick={() => handleDeleteTask(task.id, 'inProgress')} />
                    )}
                  </div>
                  <div className="align-left-icon">
                    <FiAlignLeft onClick={() => toggleDeleteIcon(task.id, 'inProgress')} />
                    <FaRegCommentAlt style={{marginLeft:"10px", fontSize:"12px"}} />
                  </div>
                </div>
              )}
              {showAddInput.inProgress ? (
                <div className="add-task1">
                  <input
                    type="text"
                    value={newTasks.inProgress}
                    onChange={(e) => handleInputChange(e, 'inProgress')}
                    placeholder="Enter task"
                  />
                  <button onClick={() => handleAddTask('inProgress')}>Add</button>
                </div>
              ) : (
                <div className="add-task">
                     
                  <GoPlus className="icon" onClick={() => toggleAddInput('inProgress')} />
                  <p>Add a card</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review Section */}
        
        <div className="section"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'review')}>
          <div className="card">
            <div className='title-div'>
              <h2>Review</h2>
              <p><BsThreeDots /></p> 
            </div>
            <div className="task-list">
              {tasks.review.map(task =>
                <div key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, 'review')}
                  className="task">
                  <div className="task-content">
                  <CgLoadbar style={{ color: getRandomColor(), fontSize: '60px' }} />
                    <h4>{task.title}</h4>
                    {showDeleteIcons.review[task.id] && (
                      <FaTrash className="icon" onClick={() => handleDeleteTask(task.id, 'review')} />
                    )}
                  </div>
                  <div className="align-left-icon">
                    <FiAlignLeft onClick={() => toggleDeleteIcon(task.id, 'review')} />
                    <FaRegCommentAlt style={{marginLeft:"10px", fontSize:"12px"}} />
                  </div>
                </div>
              )}
              {showAddInput.review ? (
                <div className="add-task1">
                  <input
                    type="text"
                    value={newTasks.review}
                    onChange={(e) => handleInputChange(e, 'review')}
                    placeholder="Enter task"
                  />
                  <button onClick={() => handleAddTask('review')}>Add</button>
                </div>
              ) : (
                <div className="add-task">
                     
                  <GoPlus className="icon" onClick={() => toggleAddInput('review')} />
                  <p>Add a card</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Done Section */}
      
        <div className="section"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'done')}>
          <div className="card">
            <div className='title-div'>
              <h2>Done</h2>
              <p><BsThreeDots /></p> 
            </div>
            <div className="task-list">
              {tasks.done.map(task =>
                <div key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, 'done')}
                  className="task">
                  <div className="task-content">
                  <CgLoadbar style={{ color: getRandomColor(), fontSize: '60px' }} />
                    <h4>{task.title}</h4>
                    {showDeleteIcons.done[task.id] && (
                      <FaTrash className="icon" onClick={() => handleDeleteTask(task.id, 'done')} />
                    )}
                  </div>
                  <div className="align-left-icon">
                    <FiAlignLeft onClick={() => toggleDeleteIcon(task.id, 'done')} />
                    <FaRegCommentAlt style={{marginLeft:"10px", fontSize:"12px"}} />
                  </div>
                </div>
              )}
              {showAddInput.done ? (
                <div className="add-task1">
                  <input
                    type="text"
                    value={newTasks.done}
                    onChange={(e) => handleInputChange(e, 'done')}
                    placeholder="Enter task"
                  />
                  <button onClick={() => handleAddTask('done')}>Add</button>
                </div>
              ) : (
                <div className="add-task">
                   
                  <GoPlus className="icon" onClick={() => toggleAddInput('done')} />
                  <p>Add a card</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


import React from 'react';

function Task({ task, due, isCompleted, isCollapsed }: any) {
  const handleCompleteTask = () => {
    // Implement completion logic here
  };

  const handleEditTask = () => {
    // Implement edit logic here
  };

  const handleDeleteTask = () => {
    // Implement delete logic here
  };

  return (
    <div className={isCollapsed ? "task collapsed-task" : "task"}>
      <h2>{task}</h2>
      <p>Due: {due}</p>
      <p style={{ color: isCompleted ? 'rgba(46, 213, 115,1.0)' : 'rgba(255, 71, 87,1.0)' }}>Status: {isCompleted ? 'Completed' : 'Incomplete'}</p>
      <div className="task-buttons">
        {!isCompleted && (
          <>
            <button onClick={handleCompleteTask}>
             <span className="icon"> &#10004; </span>
            </button>
            <button onClick={handleEditTask}>
             <span className="icon"> &#9998;</span>
            </button>
          </>
        )}
        <button onClick={handleDeleteTask}>
        <span className="icon"> &#10007;</span>
        </button>
      </div>
    </div>
  );
}

export default Task;

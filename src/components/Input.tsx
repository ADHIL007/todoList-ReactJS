import React, { useState } from "react";
import useLocalStorage from "use-local-storage";

interface Task {
  id: number;
  task: string;
  dueDate: string;
  time: string;
  completed: boolean;
}

function Input() {
  const [clicked, setClicked] = useState(false);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("00:00");
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>("tasks", []);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      task: task,
      dueDate: dueDate,
      time: time,
      completed: false,
    };
    console.log(newTask);

    setStoredTasks([...storedTasks, newTask]);
    setTask("");
    setDueDate(new Date().toISOString().split("T")[0]);
    setTime("00:00");
    setClicked(false);
  };

  return (
    <div className="input-container">
      {clicked ? (
        <>
          <input
            type="text"
            placeholder="Add a task"
            className="task-input"
            value={task}
            onChange={handleTaskChange}
          />
          <div className="due-date">
            <p>Due date and Time</p>
            <input
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
              className="date-input"
            />
            <input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="time-input"
            />
          </div>
          <button className="add-button" onClick={handleAddTask}>
            Add {'\u002B'}
          </button>
        </>
      ) : (
        <div className="add-task-icon" onClick={() => setClicked(!clicked)}>
          {'\u002B'} Add new Task
        </div>
      )}
    </div>
  );
}

export default Input;

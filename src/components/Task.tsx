import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
interface TaskProps {
  id: number;
  task: string;
  due: string;
  isCompleted: boolean;
  isCollapsed: boolean;
  time?: string;
  options: string;
  completedTime: string;
  completedDate: string;
}

function Task({
  task,
  due,
  isCompleted,
  isCollapsed,
  id,
  time,
  options,
  completedDate,
  completedTime,
}: TaskProps) {
  const [edtStatus, setEdtStatus] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const [updatedDueDate, setUpdatedDueDate] = useState(due);
  const [updatedDueTime, setUpdatedDueTime] = useState(time);
  const [storedTasks, setStoredTasks] = useLocalStorage<TaskProps[]>(
    "tasks",
    []
  );

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTask(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedDueDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedDueTime(e.target.value);
  };

  const handleCompleteTask = () => {
    console.log("clicked");
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString();
    const updatedTasks = storedTasks.map((t) =>
      t.id === id
        ? { ...t, completed: true, completedTime: time, completedDate: date }
        : t
    );
    console.log(updatedTasks.filter((t) => t.id === id));
    setStoredTasks(updatedTasks);
  };

  const handleEditTask = () => {
    setEdtStatus(!edtStatus);
  };


  const handleUpdateTask = () => {
    console.log("clicked");
    if (updatedTask.trim() === "") {
      alert("Task cannot be empty");
      return;
    }

    const updatedTasks = storedTasks.map((t) =>
      t.id === id
        ? { ...t, task: updatedTask, due: updatedDueDate, time: updatedDueTime }
        : t
    );
    console.log(updatedTasks);
    setStoredTasks(updatedTasks);
    setEdtStatus(false);
  };

  const handleDeleteTask = () => {
    const updatedTasks = storedTasks.filter((t) => t.id !== id);
    setStoredTasks(updatedTasks);
  };

  return (
    <>
      {edtStatus ? (
        <div className="input-container">
          <input
            type="text"
            placeholder="Edit task"
            className="task-input"
            value={updatedTask}
            onChange={handleTaskChange}
            maxLength={55}
          />
          <div className="due-date">
            {options === "Today" ? (
              <>
                <p>Time</p>
                <input
                  type="time"
                  value={updatedDueTime}
                  onChange={handleTimeChange}
                  className="time-input"
                />
              </>
            ) : (
              <>
                <p>Due date and Time</p>
                <input
                  type="date"
                  value={updatedDueDate}
                  onChange={handleDueDateChange}
                  className="date-input"
                />
                <input
                  type="time"
                  value={updatedDueTime}
                  onChange={handleTimeChange}
                  className="time-input"
                />
              </>
            )}
          </div>
        <div><button className="update-button" onClick={handleUpdateTask}>
            Update </button>
            <button
                         className={`update-button  cancel-button ${edtStatus ? 'active' : ''}`}
                        style={edtStatus ? { backgroundColor: "red" } : {}}
                        onClick={handleEditTask}
                                           >

            cancel
          </button></div>
        </div>
      ) : (
        <div className={isCollapsed ? "task collapsed-task" : "task"}>
          <h2>{task}</h2>
          {options === "Completed" ? (
            <>
              <p style={{ textDecoration: "line-through" ,fontStyle:"italic"}}>
                Due: {due} {time && `at ${time}`}
              </p>
              <p style={{color:"rgba(50, 255, 126,1.0)",fontWeight:"bold"}} >
                Completed on {completedDate} {completedTime}
              </p>
            </>
          ) : (
            <p>
              Due: {due} {time && `at ${time}`}
            </p>
          )}

          <p
            style={{
              color: isCompleted
                ? "rgba(50, 255, 126,1.0)"
                : "rgba(255, 56, 56,1.0)",
              fontWeight: "bold",
            }}
          >
            Status: {isCompleted ? "Completed" : "Incomplete"}
          </p>
          <div className="task-buttons">
            {!isCompleted && (
              <>
                <button onClick={handleCompleteTask}>
                  <DoneAllOutlinedIcon color="success" />
                </button>
                <button onClick={handleEditTask}>
                  <EditOutlinedIcon color="primary" />
                </button>
              </>
            )}
            <button onClick={handleDeleteTask}>
              <DeleteOutlineOutlinedIcon color="error" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;

import React, { useState } from "react";
import Input from "./Input";
import Task from "./Task";
import useLocalStorage from "use-local-storage";

function TaskView({ options, isCollapsed }: any) {
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);
  const [tasks, setTasks] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const next7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  React.useEffect(() => {
    if (options === "Today") {
      const todayTasks = storedTasks.filter(
        (task: any) => task.dueDate === today
      );
      setTasks(todayTasks);
    } else if (options === "Next") {
      const nextTasks = storedTasks.filter(
        (task: any) => task.dueDate > today && task.dueDate <= next7Days
      );
      setTasks(nextTasks);
    } else if (options === "Completed") {
      const completedTasks = storedTasks.filter((task: any) => task.completed);
      setTasks(completedTasks);
    } else {
      setTasks([]);
    }
  }, [options, storedTasks]);

  return (
    <div className={isCollapsed ? "task-view collapsed-taskview" : "task-view"}>
      <h1 className="task-view-title">
        {options === "Today"
          ? "Today"
          : options === "Next"
          ? "Next 7 Days"
          : "Completed Tasks"}
      </h1>
      <div className="task-container">
        {tasks.map((task: any) => (
          <Task
            key={task.id}
            task={task.task}
            due={task.dueDate}
            isCompleted={task.completed}
            time={task.time}
          />
        ))}
        {(options === "Today" || options === "Next") && <Input />}
      </div>
    </div>
  );
}

export default TaskView;

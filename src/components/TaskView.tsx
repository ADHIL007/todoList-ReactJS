import React, { useState } from "react";
import Input from "./Input";
import Task from "./Task";
import useLocalStorage from "use-local-storage";
interface Task {
  id: number;
  task: string;
  dueDate: string;
  time: string;
  completed: boolean;
}
function TaskView({ options, isCollapsed }: any) {
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>("tasks", []);
  const [tasks, setTasks] = useState<Task[]>([]);


  const today = new Date().toISOString().split("T")[0];
  const next7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

    React.useEffect(() => {
      if (options === "Today") {
        const todayTasks = storedTasks.filter(
          (task) => task.dueDate === today
        );
        setTasks(todayTasks);
      } else if (options === "Next") {
        const nextTasks = storedTasks.filter(
          (task) => task.dueDate > today && task.dueDate <= next7Days
        );
        setTasks(nextTasks);
      } else if (options === "Completed") {
        const completedTasks = storedTasks.filter((task) => task.completed);
        setTasks(completedTasks);
      } else if (options === "others") {
        const otherTasks = storedTasks.filter(
          (task) => new Date(task.dueDate) > new Date(next7Days) && !task.completed
        );
        setTasks(otherTasks);
      } else if (options === "inCompleted") {
        const incompleteTasks = storedTasks.filter(
          (task) => new Date(task.dueDate) < new Date(today) && !task.completed
        );
        setTasks(incompleteTasks);
      }
    }, [options, storedTasks]);


  const completedLength = tasks.filter((t) => t.completed === true).length || 0;

  return (
    <div className={isCollapsed ? "task-view collapsed-taskview" : "task-view"}>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}> <h1 className="task-view-title">
        {options === "Today"
          ? "Today"
          : options === "Next"
          ? "Next 7 Days"
          : options === "Completed"
          ? "Completed Tasks"
          : options === "others"
          ? "Other Tasks"
          : "Overdue tasks"}
      </h1>
     {options === "Today" && <h1 style={{marginRight:"10px"}}>
      {today}
      </h1>}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div className="item">
          <h2>{tasks.length}</h2>
          <h3>Total Tasks</h3>
        </div>
        <div className="item">
          <h2>{
            completedLength
            }</h2>
          <h3>completed Tasks</h3>
        </div>
        <div className="item">
          <h2>{tasks.length - completedLength}</h2>
          <h3>pending tasks.</h3>
        </div>
      </div>
      <div className="task-container">
        {tasks.map((task: any) => (
          <Task
            isCollapsed={isCollapsed}
            key={task.id}
            id={task.id}
            task={task.task}
            due={options === "Today" ? "Today" : task.dueDate}
            isCompleted={task.completed}
            time={task.time}
            options={options}
            completedDate={task.completedDate}
            completedTime={task.completedTime}
          />
        ))}
        {(options === "Today" ||
          options === "Next" ||
          options === "others") && <Input options={options} />}
      </div>
    </div>
  );
}

export default TaskView;

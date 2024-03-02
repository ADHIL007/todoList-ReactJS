import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import Input from "./components/Input";
import SideBar from "./components/SideBar";
import TaskView from "./components/TaskView";

function App() {
  const [Task, setTask] = useLocalStorage<string>("Task", "");
  const [options, setOptions] = useState("Today");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleOptionChange = (option: string) => {
    setOptions(option);
    console.log(options);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="App">
      <SideBar
        handleOptionChange={handleOptionChange}
        options={options}
        handleCollapseToggle={handleCollapseToggle}
        collapsed={isCollapsed}
      />
      <TaskView options={options} isCollapsed={isCollapsed} />
    </div>
  );
}

export default App;

import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { tasks as data } from "./Tasks";
import { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(data);
  }, []);

  function handleAddTask(taskTitle) {
    setTasks([...tasks, {
      id: tasks.length + 1,
      title: taskTitle,
      description: "Descripción por defecto"
    }]);
  }

  return (
    <>
      <TaskList tasks={tasks} />
      <TaskForm handleAddTask = {handleAddTask}/>
    </>
  );
}

export default App;

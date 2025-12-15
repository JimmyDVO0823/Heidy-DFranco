import { useState } from "react";

function TaskForm({ handleAddTask }) {
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nueva Tarea:", title);
    
    handleAddTask(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear una nueva tarea</h1>
      <input
        type="text"
        placeholder="Nueva Tarea"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button>Crear</button>
    </form>
  );
}

export default TaskForm;

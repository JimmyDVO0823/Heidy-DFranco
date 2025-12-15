function TaskList({ tasks }) {
  return (
    <div>
      <h1>Lista de Tareas</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;

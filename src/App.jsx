import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Taskmaster</h1>
      <TaskForm tasks={tasks} setTasks={setTasks} />

      {/* Task Count */}
      <div className="mb-4">
        <p className="text-lg">Total Tasks: {tasks.length}</p>
        <p className="text-lg">
          Completed: {tasks.filter((task) => task.completed).length}
        </p>
      </div>

      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;

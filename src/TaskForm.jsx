import React, { useState } from "react";

function TaskForm({ tasks, setTasks }) {
  const [task, setTask] = useState({ description: "", date: "", time: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.description || !task.date || !task.time) {
      alert("Please fill in all fields.");
      return;
    }
    setTasks([
      ...tasks,
      {
        ...task,
        id: Date.now(),
        completed: false,
        due: new Date(`${task.date}T${task.time}`),
      },
    ]);
    setTask({ description: "", date: "", time: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 w-11/12 sm:w-1/2">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={task.date}
          onChange={(e) => setTask({ ...task, date: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="time"
          value={task.time}
          onChange={(e) => setTask({ ...task, time: e.target.value })}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

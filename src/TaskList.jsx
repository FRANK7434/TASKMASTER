import React, { useEffect, useState } from "react";

function TaskList({ tasks, setTasks }) {
  const [timers, setTimers] = useState(
    tasks.map((task) => ({ id: task.id, time: "" }))
  );

  const updateCountdown = (task) => {
    const now = new Date();
    const diff = new Date(task.due) - now;
    if (diff < 0) return "Overdue";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(
        tasks.map((task) => ({
          id: task.id,
          time: updateCountdown(task),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  const handleDelete = (id) => {
    const encryptionCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const userInput = prompt(
      `To delete this task, please enter the following code: ${encryptionCode}`
    );

    if (userInput === encryptionCode) {
      setTasks(tasks.filter((task) => task.id !== id));
      alert("Task deleted successfully.");
    } else {
      alert("Incorrect code. Task was not deleted.");
    }
  };

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortByDueDate = () => {
    setTasks([...tasks].sort((a, b) => new Date(a.due) - new Date(b.due)));
  };

  return (
    <div className="w-11/12 sm:w-1/2">
      {/* Sorting Button */}
      <button
        onClick={sortByDueDate}
        className="mb-4 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Sort by Due Date
      </button>

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 mb-4 rounded shadow flex justify-between items-center ${
            task.completed ? "bg-green-200" : "bg-white"
          }`}
        >
          <div>
            <h3 className="text-lg font-semibold">{task.description}</h3>
            <p className="text-gray-600">{`${task.date} ${task.time}`}</p>
            <p className="text-sm text-red-500">
              {timers.find((t) => t.id === task.id)?.time || "Calculating..."}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleComplete(task.id)}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;

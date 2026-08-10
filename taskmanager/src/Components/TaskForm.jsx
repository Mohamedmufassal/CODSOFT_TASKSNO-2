import React from 'react'
import { useState } from 'react';

function TaskForm ({ addTask }) {
    const [taskText, setTaskText] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("Personal");

function handleSubmit(e) {
  e.preventDefault();
  if (taskText.trim() === "") {
    return;
  }
  addTask(taskText, priority, dueDate, category);
  setTaskText("");
  setPriority("Medium");
  setDueDate("");
  setCategory("Personal");
}

return (
  <form onSubmit={handleSubmit}>
    <div className='task-form'>
      <input className="task-input" type="text"
        placeholder="Enter a task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}/>
        <select className='task-select' value={priority}
      onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
         <option value="Low">Low</option>
      </select>
      <input className="task-date" type='date'
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}/>
       <select className="task-select" value={category}
      onChange={(e) => setCategory(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
         <option value="Study">Study</option>
         <option value="Shopping">Shopping</option>
      </select>
      <button className='add-btn' type='submit'>Add Task</button>
      </div>
  </form>
);
}

export default TaskForm;

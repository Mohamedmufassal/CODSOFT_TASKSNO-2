import './App.css';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [search, setSearch] = useState("");
  const [filter,setFilter] = useState("all");
  const [priorityFilter,setPriorityFilter] = useState("all");
  // const [sortBy, setSortBy] = useState("newest");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("theme",darkMode ? "dark" : "light");
  },[darkMode]);

  function addTask(taskText, priority, dueDate, category) {

    const newTask = {
      id: Date.now(),
      text: taskText,
      priority: priority,
      dueDate: dueDate,
      category: category,
      completed: false,
    };
     
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
  }

  function toggleTask(id) {
  const updatedTasks = tasks.map((task) => {
    if (task.id === id){
      return {
        ...task,completed: !
        task.completed,
      };
    }
    return task;
  });

  setTasks(updatedTasks);
  toast.success("Task status updated!");
}

function deleteTask(id) {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  setTasks(updatedTasks);
   toast.info("Task deleted!");
}

function editTask(id, newTask) {
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,text: newTask,
      };
    }
    return task;
  });
  setTasks(updatedTasks);
  toast.success("Task updated!");
}

const filteredTasks = tasks.filter((task) => {
const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
const matchesStatus = filter === "all"
    ? true
    :filter === "completed"
    ?task.completed
    : !task.completed;

const matchesPriority = priorityFilter === "all"
    ?true
    :task.priority === priorityFilter;

  return matchesSearch && matchesStatus && matchesPriority;
});

// const sortedTasks = [...filteredTask].sort ((a,b) => 
// {
//   if (sortBy === "newest") {
//     return b.id - a.id;
//   }

//    if (sortBy === "oldest") {
//     return b.id - a.id;
//   }

//    if (sortBy === "high") {
//     const order = {
//       High: 1,
//       Medium: 2,
//       Low: 3,
//     };
//     return order[a.priority] - order[b.priority];
//     }
    
//     if (sortBy === "low") {
//     const order = {
//       High: 1,
//       Medium: 2,
//       Low: 3,
//     };
//     return order[a.priority] - order[b.priority];
//     }

//     if (sortBy === "dueDate") {

//     if (!a.dueDate) return 1;
//     if (!a.dueDate) return -1;
    
//     return new Date(a.dueDate) - new Date(b.dueDate);
//     }

//     return 0;
// });
const totalTasks = tasks.length;
const completedTasks = tasks.filter((task) => task.completed).length;
const pendingTasks = tasks.filter((task) => !task.completed).length;
const progress = totalTasks === 0 ? 0: Math.round((completedTasks / totalTasks) * 100);
  return (
    <div className={darkMode ? "App dark" : "App"}>
      <div className='container'>
      <Header/>
      <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
    
     <div className='controls'>

       <input type='text'
      placeholder='Search tasks...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}/>
      
      <select value={filter}
      onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
         <option value="pending">Pending</option>
      </select>

      <select value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="all">All Priorities</option>
         <option value="High">High</option>
        <option value="Medium">Medium</option>
         <option value="Low">Low</option>
      </select>

    {/* <select value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest</option>
         <option value="oldest">Oldest</option>
        <option value="high">High</option>
         <option value="Low">Low</option>
         <option value="dueDate">DueDate</option>
      </select> */}

      </div>
      <div className='task-counter'>
      <p>Total Tasks: {totalTasks} | Completed: {completedTasks}</p>
      </div>
      <TaskForm addTask={addTask}/>

      <div className='progress-section'>
        <h3>Task Progress</h3>
        <div className='progress-bar'>
          <div className='progress-fill' style={{width: `${progress}%`}}></div>
        </div>
        <p>
          {completedTasks} of {totalTasks} Tasks Completed ({progress}%)
        </p>
      </div>

      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask}/>
      <ToastContainer position='top-right' autoClose={2000} />
      </div>
    </div>
  );

}

export default App;

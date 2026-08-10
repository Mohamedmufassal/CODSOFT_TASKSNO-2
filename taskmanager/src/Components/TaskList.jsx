function TaskList({ tasks, toggleTask, deleteTask, editTask, }) {
    return(
        <div className="task-list">
            {tasks.length === 0 ? (
                <div className="empty-state">
                    <h2>🗒️No Tasks Found</h2>
                    <p>Add a new task or change your search/filter.</p> 
                    </div>
                    ) : ( tasks.map((task) => (

                <div key={task.id} className="task-card">
            <input type="checkbox" checked={task.completed} onChange={() =>
                toggleTask(task.id)}/>

                <span 
                  style={{
                    texkDecoration: task.completed ? "line-through" : "none"
                    }}>
                {task.text}</span>
                <div className="task-details">
                <p className={`priority $ {task.priority.toLowerCase()}`}>🔥Priority: {task.priority}</p>
                <p>📅{task.dueDate || "No Due Date"}</p>
                <p>📂{task.category}</p>
                </div>
                <div className="task-button">
                 <button onClick={() => deleteTask(task.id)}> Delete </button>
                 <button onClick={() => {
                    const newText = prompt("Edit task:", task.text);
                    if (newText !== null && newText.trim() !== "") {
                        editTask(task.id, newText);
                    }
                 }}> Edit </button></div>
                </div>
            ))
        )}
        </div>
);
}
export default TaskList;
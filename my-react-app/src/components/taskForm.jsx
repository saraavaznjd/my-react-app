export default function TaskForm({newTask, setNewTask, addTask}){
    return(
        <form onSubmit={addTask}>
                <input type="text" placeholder="type here..." value={newTask} onChange={e => setNewTask(e.target.value)} />
                <button type="submit">Add</button>
            </form>
    )
}
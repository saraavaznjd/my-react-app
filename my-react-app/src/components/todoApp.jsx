import { useState, useEffect } from "react";

import TaskForm from "./taskForm";
import TaskList from "./taskList"

export default function TodoApp() {
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState(() => {
    // initial state از localStorage
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  })
    const [filter, setFilter] = useState("all"); // all | active | done

    //save tasks into localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = (e) => {
        e.preventDefault()
        if (task.trim() === '') return
        const newTask = { id: Date.now(), text: task, done: false }
        setTasks([...tasks, newTask])
        setTask('')
    }

    const toggleTask = ID => {
        setTasks(
            tasks.map((t) =>
                t.id === ID ? { ...t, done: !t.done } : t
            )
        );
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.done;
        if (filter === "done") return task.done;
        return true; // all
    });

    const deleteTask = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>My To-Do List</h2>
            <TaskForm newTask={task} setNewTask={setTask} addTask={addTask} />

            <div style={{ margin: "1rem 0" }}>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("done")}>Done</button>
            </div>
            <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
            
        </div>
    )
}
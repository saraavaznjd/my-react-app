import { useState, useEffect } from "react";

export default function TodoApp() {
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState("all"); // all | active | done

    //load tasks from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('tasks')
        if (saved) {
            setTasks(JSON.parse(saved))
        }
    }, [])

    //save tasks into localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const submitClickHandler = (e) => {
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
            <form onSubmit={submitClickHandler}>
                <input type="text" placeholder="type here..." value={task} onChange={e => setTask(e.target.value)} />
                <button type="submit">Add</button>
            </form>

            <div style={{ margin: "1rem 0" }}>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("done")}>Done</button>
            </div>

            <ul style={{ marginTop: '1rem' }}>
                {
                    filteredTasks.map((t) => (
                        <li key={t.id} style={{ listStyle: 'none' }}>
                            <span onClick={() => toggleTask(t.id)} style={{
                                textDecoration: t.done ? "line-through" : 'none',
                                cursor: "pointer",
                                marginRight: "1rem"
                            }}>
                                {t.text}
                            </span>
                            <button onClick={() => deleteTask(t.id)}>❌</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
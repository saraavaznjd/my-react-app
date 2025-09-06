export default function TaskList({ tasks, toggleTask, deleteTask }) {
    return (
        <ul style={{ marginTop: '1rem' }}>
            {
                tasks.map((t) => (
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
    )
}
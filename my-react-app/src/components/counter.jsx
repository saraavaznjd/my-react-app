import { useState } from "react";

export default function Counter(){
    const [count, setCount] = useState(0)

    return (
        <div style={{textAlign:'center', padding: "1rem"}}>
            <h2>counter: {count}</h2>
            <button onClick={() => setCount(count+1)}>Increase</button>
            <button onClick={() => setCount(count-1)}>Decrease</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    )
}
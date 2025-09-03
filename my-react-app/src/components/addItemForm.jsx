import { useState } from "react";

export default function AddItemForm() {
    const [item, setItem] = useState('')
    const [items, setItems] = useState([])

    const submitClickHandler = e => {
        e.preventDefault()
        if(item.trim() === '') return;
        setItems([...items, item])
        setItem('')
    }

    return(
        <div style={{textAlign:'center', marginTop:'2rem'}}>
            <h2>Add Item Form</h2>
            <form onSubmit={submitClickHandler}>
                <input type="text" value={item} placeholder="Type SomeThing..." onChange={e => setItem(e.target.value)} />
                <button type="submit">ADD</button>
            </form>

            <ul style={{marginTop:'1rem', listStyle:'none'}}>
                {items.map((it,index) => <li key={index}>{it}</li>)}
            </ul>
        </div>
    )
}
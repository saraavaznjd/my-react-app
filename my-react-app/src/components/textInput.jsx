import { useState } from "react";

export default function TextInput (){
    const [text, setText] = useState('')

    return(
        <div style={{textAlign:'center', padding:'1rem'}}>
            <h2>Type something:</h2>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write here ..." />
            <p>Your Text: {text}</p>
        </div>
    )
}
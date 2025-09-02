import { useState } from "react";

export default function Toggle(){
    const [isOn, setIsOn] = useState(false)

    return(
        <div style={{textAlign: 'center', padding: "1rem"}}>
            <h2>
                status : {isOn ? "ON" : "OFF"}
            </h2>
            <button onClick={() => setIsOn(!isOn)}>{isOn ? "Turn OFF" : "Turn ON"}</button>
        </div>
    )
}
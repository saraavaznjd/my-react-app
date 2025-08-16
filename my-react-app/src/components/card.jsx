export default function Card({title,text}){
    return(
        <div style={{
            border:"1px solid #ccc",
            borderRadius:"8px",
            padding:"1rem",
            margin:"1rem 0"
        }}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}
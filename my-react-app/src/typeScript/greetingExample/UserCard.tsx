type UserCardProps = {
    name: string
    age: number
    isOnline: boolean
}

export default function UserCard({name,age,isOnline}: UserCardProps){
    return(
        <div style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "12px",
        margin: "10px",
        backgroundColor: isOnline ? "#e0ffe0" : "#ffe0e0",
      }}>
            <h3>{name}</h3>
            <p>Age: {age}</p>
            <p>Status: {isOnline ? "🟢 Online" : "🔴 Offline"}</p>
        </div>
    )
}
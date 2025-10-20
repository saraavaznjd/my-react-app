import React, { createContext,useContext, useState } from "react";

type User = {
    id: number
    name: string
    email: string
}

type userContextProps = {
    selectedUser: User | null
    setSelectedUser: (user: User) => void
}

const userContext = createContext<userContextProps | undefined>(undefined)

export const UserContextProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    return(
        <userContext.Provider value={{selectedUser,setSelectedUser}}>
            {children}
        </userContext.Provider>
    )
}

export function useUserContext(){
    const context = useContext(userContext)
    if(!context){
        throw new Error('Context must be use in a provider!')
    }

    return context
}
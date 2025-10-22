import { createContext, useReducer } from "react";
import type { Action, TodoContextType, TodoState } from "./type.js";


const todoReducer = (state: TodoState, action: Action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {id:Date.now(), text: action.payload, completed: false}]
    
        case "REMOVE":
            return state.filter(todo => todo.id !== action.payload)
            
        case "TOGGLE":
            return state.map(todo => {
                if(todo.id === action.payload) return {...todo, completed: !todo.completed}
                else return todo
            })
        default:
            return state;
    }
}

export const todoContext = createContext<TodoContextType|undefined>(undefined)

export const TodoProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [todos, dispatch] = useReducer(todoReducer,[])

    return <todoContext.Provider value={{todos,dispatch}}>{children}</todoContext.Provider>
}
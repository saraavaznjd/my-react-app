import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";
import type { Action, TodoContextType, TodoState } from "./type.js";


const todoReducer = (state: TodoState, action: Action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: Date.now(), text: action.payload, completed: false }]

        case "REMOVE":
            return state.filter(todo => todo.id !== action.payload)

        case "TOGGLE":
            return state.map(todo => {
                if (todo.id === action.payload) return { ...todo, completed: !todo.completed }
                else return todo
            })
        default:
            return state;
    }
}

export const todoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialState: TodoState = JSON.parse(localStorage.getItem('todos') || '[]')
    const [todos, dispatch] = useReducer(todoReducer, initialState)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = useCallback((text: string) => { dispatch({ type: "ADD", payload: text }) }, [])
    const toggleTodo = useCallback((id: number) => { dispatch({ type: "TOGGLE", payload: id }) }, [])
    const removeTodo = useCallback((id: number) => { dispatch({ type: "REMOVE", payload: id }) }, [])

    const value = useMemo(() => ({ todos, addTodo, toggleTodo, removeTodo }), [todos])

    return <todoContext.Provider value={value}>{children}</todoContext.Provider>
}
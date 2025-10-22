import type { Dispatch } from "react"

export type Todo = {
    id: number
    text: string
    completed: boolean
}

export type Action =
| {type:"ADD", payload:string}
| {type:"REMOVE", payload: number}
| {type: "TOGGLE", payload: number}

export type TodoState = Todo[]

export type TodoContextType = {
    todos: TodoState
    dispatch: Dispatch<Action>
}
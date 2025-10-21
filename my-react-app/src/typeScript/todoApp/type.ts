export type Todo = {
    id: number
    text: string
    completed: boolean
}

export type TodoState = Todo[]

export type Action = 
    | {type: "ADD"; payload: string}
    | {type: "TOGGLE"; payload: number}
    | {type: "REMOVE"; payload: number}

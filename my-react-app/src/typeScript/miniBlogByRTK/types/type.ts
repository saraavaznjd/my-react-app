export type User = {
    id: number
    name: string
    token: string
}

export type Post = {
    id: number
    title: string
    body: string
    userId: number
}
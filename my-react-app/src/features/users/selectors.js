import { createSelector } from "reselect";

export const selectUsers = state => state.users.data

export const selectPosts = state => state.posts.data

export const selectPostsByAuthor = createSelector(
    [selectUsers, selectPosts],
    (users, posts) => {
        return posts.map(post => {
            const author = users.find(user => user.id === post.userId)
            return {
                ...post,
                authorName: author ? author.name : 'Unknown'
            }
        })
    }
)
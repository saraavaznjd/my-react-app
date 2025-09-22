import { createSelector } from "reselect";

export const selectUserCount = state => state.users.list.length

export const selectPostsByUser = (userID) => createSelector(
    state => state.posts.list,
    posts => posts.filter(post => post.userId === userID)
)

export const selectUsersWithPostCount = createSelector(
    state => state.users.list,
    state => state.posts.list,
    (users, posts) => users.map(
        user => ({
            ...user,
            postCount: posts.filter((p) => p.userId === user.id).length
        })
    )
)
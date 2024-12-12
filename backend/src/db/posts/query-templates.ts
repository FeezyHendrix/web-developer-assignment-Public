export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

export const delelePostsTemplate = `DELETE FROM posts WHERE id=?`;

export const createPostTemplate = `
    INSERT INTO posts (title, body, user_id, created_at, id) VALUES (?, ?, ?, ?, ?)
`;

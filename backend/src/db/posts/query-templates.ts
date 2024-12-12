export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

export const delelePostsTemplate = `
    DELETE from posts where id = ?
`;

export const createPostTemplate = `
    INSERT INTO posts (title, body, user_id) VALUES (?, ?, ?)
`;

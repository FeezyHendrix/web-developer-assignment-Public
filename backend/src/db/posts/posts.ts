import { error } from "console";
import { connection } from "../connection";
import { createPostTemplate, delelePostsTemplate, selectPostsTemplate } from "./query-templates";
import { Post } from "./types";
import crypto from "crypto";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePosts = (postId: string): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.all(delelePostsTemplate, [postId], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });

export const createNewPost = (title: string, body: string, userId: number, date: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const id = crypto.randomBytes(16).toString("hex");
    connection.all(createPostTemplate, [title, body, userId, date, id], (error, result) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });

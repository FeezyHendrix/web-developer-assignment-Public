import axios from 'axios';
import type { Post, PostData, UserTableResponse } from '../types';

const api = axios.create({
  baseURL: 'https://test.bluelight.studio',
});

export const getUsers = async (
  page: number
): Promise<UserTableResponse> => {
  const perPage = 4;
  const response = await api.get(
    `/users?pageNumber=${page}&pageSize=${perPage}`
  );

  return response?.data;
};

export const getUserPosts = async ({
  queryKey,
}: any): Promise<Post[]> => {
  const [, { userId }] = queryKey;
  const response = await api.get(`/posts?userId=${userId}`);
  return response.data;
};

export const getCount = async (): Promise<any> => {
  const response = await api.get(`/users/count`);
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  await api.delete(`/posts/${postId}`);
};

export const createPost = async (data: PostData): Promise<Post> => {
  const response = await api.post('/posts', data);
  return response.data;
};

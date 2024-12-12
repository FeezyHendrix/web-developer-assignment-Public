export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
}

export interface Post {
  id: number;
  userId: string;
  title: string;
  body: string;
}

export interface PostData {
  userId: string;
  title: string;
  body: string;
}

export type UserTableResponse = User[];

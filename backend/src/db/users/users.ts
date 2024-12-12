import { connection } from "../connection";

import { selectCountOfUsersTemplate, selectUsersTemplate } from "./query-templates";
import { IAllUser, User } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(selectCountOfUsersTemplate, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.count);
    });
  });

export const getUsers = (pageNumber: number, pageSize: number): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<IAllUser>(selectUsersTemplate, [pageNumber * pageSize, pageSize], (error, results) => {
      if (error) {
        reject(error);
      }

      const users: User[] = [];
      results.forEach((row) => {
        users.push({
          id: row.id,
          name: row.name,
          username: row.username,
          email: row.email,
          phone: row.phone,
          address: `${row.street}, ${row.city}, ${row.state}, ${row.zipcode}`,
        });
      });
      resolve(users);
    });
  });

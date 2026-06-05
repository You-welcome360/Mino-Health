import { promises as fs } from "fs";
import path from "path";

import { User } from "../types/user.types";

const USERS_FILE = path.join(
  process.cwd(),
  "src",
  "data",
  "users.json"
);
const readUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(
      USERS_FILE,
      "utf-8"
    );

    return JSON.parse(data);
  } catch {
    return [];
  }
};

//Write users
const writeUsers = async (
  users: User[]
): Promise<void> => {
  await fs.writeFile(
    USERS_FILE,
    JSON.stringify(users, null, 2)
  );
};

//Find User By Username
export const findByUsername = async (
  username: string
): Promise<User | undefined> => {
  const users = await readUsers();

  return users.find(
    (u) => u.username === username
  );
};

export const findById = async (
  id: string
): Promise<User | undefined> => {
  const users = await readUsers();

  return users.find((u) => u.id === id);
};

export const createUser = async (
  user: User
): Promise<User> => {
  const users = await readUsers();

  users.push(user);

  await writeUsers(users);

  return user;
};
import fs from "fs";
import path from "path";
import { getAllUsers } from "./get-all-users";

const filePath = path.join(process.cwd(), "data", "users.json");

const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

export const createUser = async ({ email, password }) => {
  try {
    const users = await getAllUsers();

    const userAlreadyExist = users.find((user) => user.email === email);

    if (userAlreadyExist) {
      throw new Error("User Already Exist");
    } else {
      const newUser = { email, password, userId: users.length + 1 };
      writeData([...users, newUser]);
    }
  } catch (error) {
    throw error;
  }
};

import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
};

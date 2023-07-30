// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAllUsers } from "../services/get-all-users";
import { createUser } from "../services/signup";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await createUser(JSON.parse(req.body));
    return res.status(200).json(req.body);
  } else if (req.method === "GET") {
    const data = await getAllUsers();
    return res.status(200).json(data);
  }
  return req.status();
}

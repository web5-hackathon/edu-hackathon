"use server";
import { userController } from "@/server/actions/userController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const { userhash } = req.body;
        if (await userController.isExist(userhash)) {
          res.status(400).json("userhash already exists");
        }
        const createUserResult = await userController.createUser(userhash);
        res.status(201).json(createUserResult);
        break;

      case "GET":
        const allUsers = await userController.getAllUsers();
        res.status(200).json(allUsers);
        break;

      default:
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

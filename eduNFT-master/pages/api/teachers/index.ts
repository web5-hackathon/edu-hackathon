"use server";
import { teacherController } from "@/server/actions/teacherController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const { email, password, action } = req.body;
        if (action === "register") {
          const createUserResult = await teacherController.createTeacher(
            email,
            password
          );
          res.status(201).json(createUserResult);
        } else if (action === "login") {
          console.log(email);
          const teacher = await teacherController.getId(email);
          if (teacher) {
            res.status(200).json(teacher);
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        } else {
          res.status(400).json({ message: "Invalid action" });
        }
        break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { userController } from "@/server/actions/userController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case "GET":
        const user = await userController.getUserById(
          parseInt(id as string, 10)
        );
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
        break;

      case "PUT":
        const updates = req.body;
        const updateResult = await userController.updateUser(
          parseInt(id as string, 10),
          updates
        );
        if (!updateResult) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
        break;

      case "DELETE":
        const deleteResult = await userController.deleteUser(
          parseInt(id as string, 10)
        );
        if (!deleteResult) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
        break;

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

import { initDatabase } from "@/server/actions/init_db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initDatabase();
  res.status(200).json({ message: "Database initialized" });
}

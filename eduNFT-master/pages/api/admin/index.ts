"use server";
import { adminController } from "@/server/actions/adminController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const getAdminResult = await adminController.getAllAdmins();
        res.status(201).json(getAdminResult);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

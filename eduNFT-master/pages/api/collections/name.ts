"use server";
import { nftCollectionController } from "@/server/actions/nftCollectionsController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const { contractHash } = req.body;
        const updatedData =
          await nftCollectionController.getNFTCollectionByContractAddress(
            contractHash
          );
        const coreseName = updatedData.name;
        res.status(200).json(coreseName);
        break;

      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

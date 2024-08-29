"use server";
import { nftCollectionController } from "@/server/actions/nftCollectionsController";
import { userController } from "@/server/actions/userController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const {
          id,
          name,
          is_approved,
          contractAddress,
          user_id,
          teacherId,
          createdAt,
        } = req.body;
        if (
          !id ||
          !name ||
          is_approved === undefined ||
          !contractAddress ||
          user_id === undefined ||
          teacherId === undefined ||
          !createdAt
        ) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedData1 = {
          id,
          name,
          is_approved,
          contractAddress,
          user_id: user_id ? BigInt(user_id) : undefined,
          teacherId: teacherId ? BigInt(teacherId) : undefined,
          createdAt: new Date(createdAt),
        };

        const updateResult1 = await nftCollectionController.updateNFTCollection(
          id,
          updatedData1
        );
        res.status(200).json(updateResult1);
        break;

      case "PUT":
        const { contractHash, userHash } = req.body;

        const userid = await userController.getUserIdByAddress(userHash);
        const updatedData2 =
          await nftCollectionController.getNFTCollectionByContractAddress(
            contractHash
          );
        updatedData2.user_id = BigInt(userid.id);
        const updateResul2 = await nftCollectionController.updateNFTCollection(
          updatedData2.id,
          updatedData2
        );
        res.status(200).json(updateResul2);
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

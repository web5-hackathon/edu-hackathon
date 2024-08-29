import { nfts } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";

async function createNFT(tokenURI: string, tokenId: string, userId: number) {
  const tokenIdBigInt = BigInt(tokenId);
  const result = await db
    .insert(nfts)
    .values({
      tokenId: tokenIdBigInt,
      tokenURI,
      userId: BigInt(userId),
      mintedAt: new Date(),
    })
    .execute();
  return result;
}

async function getAllNFTs() {
  try {
    const result = await db.select().from(nfts).execute();
    return result;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw new Error("Unable to fetch NFTs");
  }
}

async function getNFTById(id: number) {
  try {
    const result = await db
      .select()
      .from(nfts)
      .where(eq(nfts.userId, BigInt(id)));

    return result || null;
  } catch (error) {
    console.error("Error fetching NFT by ID:", error);
    throw new Error("Unable to fetch NFT");
  }
}

async function updateNFT(
  id: number,
  updates: Partial<typeof nfts.$inferInsert>
) {
  try {
    const result = await db
      .update(nfts)
      .set(updates)
      .where(eq(nfts.id, id))
      .execute();
    return result;
  } catch (error) {
    console.error("Error updating NFT:", error);
    throw new Error("Unable to update NFT");
  }
}

async function deleteNFT(id: number) {
  try {
    const result = await db.delete(nfts).where(eq(nfts.id, id)).execute();
    return result;
  } catch (error) {
    console.error("Error deleting NFT:", error);
    throw new Error("Unable to delete NFT");
  }
}

export const nftController = {
  createNFT,
  getAllNFTs,
  getNFTById,
  updateNFT,
  deleteNFT,
};

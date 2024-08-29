import { nfts, users } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";

async function createUser(userhash: string) {
  const result = await db
    .insert(users)
    .values({
      userhash,
      createdAt: new Date(),
    })
    .execute();
  return result;
}

async function getAllUsers() {
  try {
    const result = await db.select().from(users).execute();
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Unable to fetch users");
  }
}

async function getUserIdByAddress(hash: string) {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.userhash, hash))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching user by Hash:", error);
    throw new Error("Unable to fetch user");
  }
}

async function isExist(hash: string): Promise<boolean> {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.userhash, hash));

    return result.length > 0;
  } catch (error) {
    console.error("Error fetching user by Hash:", error);
    throw new Error("Unable to fetch user");
  }
}

async function getUserById(id: number) {
  try {
    const result = await db.query.users.findMany({
      where: eq(users.id, id),
    });
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Unable to fetch user");
  }
}

async function updateUser(
  id: number,
  updates: Partial<typeof users.$inferInsert>
) {
  try {
    const result = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .execute();
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Unable to update user");
  }
}

async function deleteUser(id: number) {
  try {
    const result = await db.delete(users).where(eq(users.id, id)).execute();
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Unable to delete user");
  }
}

async function getUserNfts(userId: number) {
  try {
    const userNfts = await db.query.nfts.findMany({
      where: (nfts, { eq }) => eq(nfts.userId, BigInt(userId)),
      with: {
        teacher: true,
        collection: true,
      },
    });

    return userNfts;
  } catch (error) {
    console.error("Error fetching NFTs for user:", error);
    throw new Error("Unable to fetch NFTs");
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserNfts,
  getUserIdByAddress,
  isExist,
};

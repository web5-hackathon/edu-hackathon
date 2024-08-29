import { admins } from "../schema";
import { db } from "..";
import { eq, SQL, SQLWrapper } from "drizzle-orm";

async function createAdmin(username: any, password: any, email: any) {
  const result = await db
    .insert(admins)
    .values({
      username,
      password,
      createdAt: new Date(),
    })
    .execute();
  return result;
}

async function getAllAdmins() {
  try {
    const result = await db.select().from(admins).execute();
    return result;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw new Error("Unable to fetch admins");
  }
}

async function getAdminById(id: number | SQLWrapper) {
  try {
    const result = await db.query.admins.findMany({
      where: eq(admins.id, id),
    });
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    throw new Error("Unable to fetch admin");
  }
}

async function updateAdmin(
  id: number | SQLWrapper,
  updates: {
    username?: string | SQL<unknown> | undefined;
    password?: string | SQL<unknown> | undefined;
    email?: string | SQL<unknown> | undefined;
    id?: number | SQL<unknown> | undefined;
    createdAt?: SQL<unknown> | Date | undefined;
  }
) {
  try {
    const result = await db
      .update(admins)
      .set(updates)
      .where(eq(admins.id, id))
      .execute();
    return result;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw new Error("Unable to update admin");
  }
}

async function deleteAdmin(id: number | SQLWrapper) {
  try {
    const result = await db.delete(admins).where(eq(admins.id, id)).execute();
    return result;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw new Error("Unable to delete admin");
  }
}

export const adminController = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};

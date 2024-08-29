import { admins } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";

export async function initDatabase() {
  try {
    const adminsExists = await db
      .select()
      .from(admins)
      .where(eq(admins.username, "admins"))
      .limit(1);

    if (!adminsExists.length) {
      await db.insert(admins).values({
        username: "admins",
        password: "123456",
      });

      console.log("admins user created successfully.");
    } else {
      console.log("admins user already exists.");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

import { admins, teachers } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";

async function createTeacher(email: string, password: string) {
  const result = await db
    .insert(teachers)
    .values({
      email,
      password,
      createdAt: new Date(),
    })
    .execute();
  return result;
}

async function getAllTeachers() {
  try {
    const result = await db.select().from(teachers).execute();
    return result;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw new Error("Unable to fetch teachers");
  }
}

async function getId(email: string) {
  try {
    const result = await db
      .select()
      .from(teachers)
      .where(eq(teachers.email, email))
      .limit(1);
    return result || null;
  } catch (error) {
    console.error("Error fetching teacher by email:", error);
    throw new Error("Unable to fetch teacher");
  }
}

async function getTeacherById(id: number) {
  try {
    const result = await db.query.teachers.findMany({
      where: eq(teachers.id, id),
    });
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching teacher by ID:", error);
    throw new Error("Unable to fetch teacher");
  }
}

async function updateTeacher(
  id: number,
  updates: Partial<typeof teachers.$inferInsert>
) {
  try {
    const result = await db
      .update(teachers)
      .set(updates)
      .where(eq(teachers.id, id))
      .execute();
    return result;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw new Error("Unable to update teacher");
  }
}

async function deleteTeacher(id: number) {
  try {
    const result = await db
      .delete(teachers)
      .where(eq(teachers.id, id))
      .execute();
    return result;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw new Error("Unable to delete teacher");
  }
}

export const teacherController = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getId,
};

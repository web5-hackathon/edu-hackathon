import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { admins, nftCollections, nfts, teachers, users } from "./schema";

type DBSchema = {
  users: typeof users;
  teachers: typeof teachers;
  nfts: typeof nfts;
  nftCollections: typeof nftCollections;
  admins: typeof admins;
};

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "api",
  password: "123456",
});
const db = drizzle<DBSchema>(connection);

export { db, connection };

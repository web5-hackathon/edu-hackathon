import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema: './server/schema.ts',
    out: './server/migrations',
    dialect: 'mysql',
    dbCredentials: {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "api"
    },
})

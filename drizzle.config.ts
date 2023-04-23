import "dotenv/config";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    schema: "./src/lib/db/schema.ts",
    connectionString: process.env.DATABASE_URL
};

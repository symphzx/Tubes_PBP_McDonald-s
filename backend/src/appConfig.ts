import "dotenv/config";
import { Dialect } from "sequelize";

const pe = process.env;

export const appConfig = {
    database: {
        username: pe.DB_USERNAME ?? "postgres",
        password: pe.DB_PASSWORD ?? "password",
        host: pe.DB_HOST ?? "localhost",
        port: Number(pe.DB_PORT) ?? 5432,
        database: pe.DB_NAME ?? "tubes_pbp_mcdonalds",
        dialect: (pe.DB_DIALECT ?? "postgres") as Dialect,
    },
    server: {
        port: Number(pe.SERVER_PORT) ?? 3000,
    }
};
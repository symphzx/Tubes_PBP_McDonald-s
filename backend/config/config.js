require ("dotenv").config();

const pe = process.env;

module.exports = {
    development: {
        username: pe.DB_USERNAME || "postgres",
        password: pe.DB_PASSWORD || "Oshintan.05",
        database: pe.DB_NAME || "tubes_pbp_mcdonalds",
        host: pe.DB_HOST || "localhost",
        port: pe.DB_PORT ? Number(pe.DB_PORT) : 5432,
        dialect: pe.DB_DIALECT || "postgres",
    },
};

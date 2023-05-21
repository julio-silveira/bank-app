"use strict";
require("dotenv/config");
const config = {
    database: process.env.PGDATABASE || 'NG.CASH_DB',
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '123456',
    host: process.env.PGHOST || 'db',
    port: Number(process.env.PGPORT) || 5432,
    dialect: 'postgres',
    dialectOptions: {
        decimalNumbers: true
    }
};
module.exports = config;

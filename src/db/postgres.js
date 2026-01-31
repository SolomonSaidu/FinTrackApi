import pkg from "pg";
import env from "dotenv";
env.config();
const { Pool } = pkg;
// import { database, password, port, host, user } from "pg/lib/defaults";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5000,
});

pool.connect((err) => {
  if (err) console.log("Postgres connection error");
  else console.log("connected to PostgreSQL database");
});

export default pool;

import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const DBUrl = process.env.DBURL;

// Create pool using DB URL
const pool = mysql.createPool({
  uri: DBUrl,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool.promise();

import dotenv from "dotenv";
import mysql from "mysql2"
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DATABSE_HOST,
  user: process.env.DATABSE_USER,
  database: process.env.DATABSE_NAME,
  password: process.env.DATABSE_PASSWORD
});

export default conn
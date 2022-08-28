// get the client
import mysql from "mysql2"
import {DATABSE_HOST,DATABSE_NAME,DATABSE_USER,DATABSE_PASSWORD} from "../env.js"

// create the connection to database
const conn = mysql.createConnection({
  host: DATABSE_HOST,
  user: DATABSE_USER,
  database: DATABSE_NAME,
  password: DATABSE_PASSWORD
});

export default conn
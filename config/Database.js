import sequelize from "sequelize";
import {DATABSE_HOST,DATABSE_NAME,DATABSE_USER,DATABSE_PASSWORD} from "../env.js"

const db = new sequelize(DATABSE_NAME, DATABSE_USER,DATABSE_PASSWORD,{
    host:DATABSE_HOST,
    dialect:'mysql'
})

export default db;
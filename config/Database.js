import dotenv from "dotenv";
import sequelize from "sequelize";
dotenv.config();

const db = new sequelize(
    process.env.DATABSE_NAME,
    process.env.DATABSE_USER,
    process.env.DATABSE_PASSWORD,
    {
    host:process.env.DATABSE_HOST,
    dialect:'mysql'
    }
)

export default db;
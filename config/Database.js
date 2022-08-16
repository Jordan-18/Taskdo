import sequelize from "sequelize";

const db = new sequelize('taskdo', 'root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db;
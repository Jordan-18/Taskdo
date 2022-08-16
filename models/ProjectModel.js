import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const Project = db.define('projects', {
    project_id : {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    project_name: DataTypes.STRING,
    project_level: DataTypes.STRING,
    project_team_id:DataTypes.STRING,
    project_lead:DataTypes.STRING,
    project_company_id:DataTypes.STRING,
    project_start:DataTypes.DATEONLY,
    project_end:DataTypes.DATEONLY
}, {
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default Project;

(async() => {
    await db.sync()
}) 
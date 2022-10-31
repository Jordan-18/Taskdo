import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const Task = db.define('tasks', {
    task_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    task_name: DataTypes.STRING,
    task_project_id: DataTypes.STRING,
    task_level: DataTypes.STRING,
    task_status: DataTypes.STRING,
    task_progres_status: DataTypes.STRING,
    task_parent_id: DataTypes.STRING,
    task_tanggal: DataTypes.STRING,
    task_keterangan: DataTypes.STRING,
},{
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default Task;

(async() => {
    await db.sync()
})();
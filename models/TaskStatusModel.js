import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const TaskStatus = db.define('task_status', {
    task_status_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    task_status_name : DataTypes.STRING,
}, {
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default TaskStatus;

(async() => {
    await db.sync()
})();
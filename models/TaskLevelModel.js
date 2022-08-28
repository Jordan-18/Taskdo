import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const TaskLevel = db.define('task_levels', {
    task_level_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    task_level_name : DataTypes.STRING,
}, {
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default TaskLevel;

(async() => {
    await db.sync()
})();
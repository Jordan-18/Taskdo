import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const TaskForum = db.define('Taskforums', {
    task_forum_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    task_forum_user_id: DataTypes.STRING,
    task_forum_user_name: DataTypes.STRING,
    task_forum_task_id: DataTypes.STRING,
    task_forum_task_name: DataTypes.STRING,
},{
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default TaskForum;

(async() => {
    await db.sync()
})();
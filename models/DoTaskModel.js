import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const Dotask = db.define('dotasks', {
    do_task_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    do_task_name: DataTypes.STRING,
    do_task_project_id: DataTypes.STRING,
    do_task_level: DataTypes.STRING,
    do_task_status: DataTypes.STRING,
    do_task_progres_status: DataTypes.STRING,
    do_task_parent_id: DataTypes.STRING,
    do_task_keterangan: DataTypes.STRING,
},{
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default Dotask;

(async() => {
    await db.sync()
})();
import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const DoTaskForum = db.define('dotaskforums', {
    dotask_forum_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    dotask_forum_user_id: DataTypes.STRING,
    dotask_forum_dotask_id: DataTypes.STRING,
},{
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default DoTaskForum;

(async() => {
    await db.sync()
})();
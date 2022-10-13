import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const TeamForum = db.define('teamforums', {
    team_forum_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    team_forum_user_id: DataTypes.STRING,
    team_forum_user_name: DataTypes.STRING,
    team_forum_team_id: DataTypes.STRING,
},{
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});


export default TeamForum;

(async() => {
    await db.sync()
})();
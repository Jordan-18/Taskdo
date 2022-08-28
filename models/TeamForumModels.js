import sequelize from "sequelize";
import db from "../config/Database.js";
import Team from "./TeamModel.js";
import User from "./UserModel.js";

const {DataTypes} = sequelize;

const TeamForum = db.define('teamforums', {
    team_forum_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    team_forum_user_id: DataTypes.STRING,
    team_forum_team_id: DataTypes.STRING,
},{
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

// TeamForum.hasOne(Team,{foreignKey: "team_forum_team_id"})
// TeamForum.belongsTo(Team, {foreignKey: "team_forum_team_id"})

export default TeamForum;

(async() => {
    await db.sync()
})();
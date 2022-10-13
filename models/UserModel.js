import sequelize from "sequelize";
import db from "../config/Database.js";
import TeamForum from "./TeamForumModels.js";
import Team from "./TeamModel.js";

const {DataTypes} = sequelize;

const User = db.define('users', {
    user_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    user_name: DataTypes.STRING,
    user_role_id: DataTypes.STRING,
    user_email:DataTypes.STRING,
    user_password:DataTypes.STRING,
    user_poin:DataTypes.STRING,
    user_level:DataTypes.STRING,
}, {
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

// User.hasOne(Team, {foreignKey: 'team_lead' })
// User.hasMany(TeamForum, { foreignKey: 'team_forum_user_id' })

export default User;

(async() => {
    await db.sync()
})();
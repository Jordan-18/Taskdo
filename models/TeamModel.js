import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const Team = db.define('teams', {
    team_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    team_name: DataTypes.STRING,
    team_lead: DataTypes.STRING,
    team_kode: DataTypes.STRING,
},{
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default Team;

(async() => {
    await db.sync()
})();
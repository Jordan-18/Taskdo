import sequelize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = sequelize;

const Company = db.define('companies', {
    company_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    company_name : DataTypes.STRING,
}, {
    paranoid:true,
    deleteAt: 'delete_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

export default Company;

(async() => {
    await db.sync()
})();
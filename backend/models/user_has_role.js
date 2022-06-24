const sequelize = require(".");


module.exports = (sequelize, DataTypes) => {

    const User_Has_Role = sequelize.define('user_has_role', {
            userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
            roleId: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        freezeTableName: true
    });

    return User_Has_Role;

}
const sequelize = require(".");


module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define('role', {
            name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
            description: {
            type: DataTypes.STRING(300),
            allowNull:false
        }
    }, {
        freezeTableName: true
    });

    return Role;

}
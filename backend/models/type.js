const sequelize = require(".");


module.exports = (sequelize, DataTypes) => {

    const Type = sequelize.define('type', {
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

    return Type;

}
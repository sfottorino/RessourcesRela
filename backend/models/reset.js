const sequelize = require(".");


module.exports = (sequelize, DataTypes) => {

    const Reset = sequelize.define('reset', {
            token: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
            userId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
            expiredAt: {
            type: DataTypes.DATE,
            allowNull:false
        }
    }, {
        freezeTableName: true
    });

    return Reset;

}
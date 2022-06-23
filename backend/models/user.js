const sequelize = require(".");
const Verif = require('./verif');


module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
            firstName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
            lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
        },
            email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
            password: {
            type: DataTypes.STRING,
            allowNull: false
        },
            isVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
    }, {
        freezeTableName: true
    });

    return User;

}
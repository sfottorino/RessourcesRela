const sequelize = require(".");
const User = require("./user");


module.exports = (sequelize, DataTypes) => {

    const Verif = sequelize.define('verif', {
            token: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        freezeTableName: true
    });


    return Verif;

}
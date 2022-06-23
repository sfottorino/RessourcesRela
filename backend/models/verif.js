const sequelize = require(".");


module.exports = (sequelize, DataTypes) => {

    const Verif = sequelize.define('verif', {
            token: {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return Verif;

}
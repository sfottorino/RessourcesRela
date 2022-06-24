const sequelize = require(".");


module.exports = (sequelize, DataTypes) => {

    const Ressource = sequelize.define('ressource', {
            name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
            userId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
            typeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
            shortDescription: {
            type: DataTypes.STRING(300),
            allowNull:false
        },
            contenu: {
            type: DataTypes.TEXT,
            allowNull:false
        }
    }, {
        freezeTableName: true
    });

    return Ressource;

}
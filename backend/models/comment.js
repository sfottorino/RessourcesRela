const sequelize = require(".");


module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('comment', {
            content: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
            userId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
            ressourceId: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        freezeTableName: true
    });

    return Comment;

}
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require(".");


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
        }
    }, {
        freezeTableName: true
    });

    return User;

}



// class User extends Sequelize.Model {}

// User.init({
//     id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//     },
//     firstName: {
//     type: DataTypes.STRING(100),
//     allowNull: false
//     },
//     lastName: {
//     type: DataTypes.STRING(100),
//     allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     created_date :{
//         type: DataTypes.DATE,
//         allowNull: false
//     }
// }, {
//   sequelize, // We need to pass the connection instance
//   modelName: 'user',
//   freezeTableName: true // We need to choose the model name
// });

// // the defined model is the class itself
// console.log(User === sequelize.models.User); // true
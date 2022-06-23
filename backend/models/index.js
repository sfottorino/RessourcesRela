const dbConfig = require('../config/db-config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

const db = {};
db.sequelize=sequelize;
db.models = {};
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.Verif = require('./verif')(sequelize, Sequelize.DataTypes);

db.models.User.hasOne(db.models.Verif);
db.models.Verif.belongsTo(db.models.User, {foreignKey: 'userId'});

module.exports=db;
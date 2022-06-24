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
db.models.Role = require('./role')(sequelize, Sequelize.DataTypes);
db.models.User_Has_Role = require('./user_has_role')(sequelize, Sequelize.DataTypes);
db.models.Type = require('./type')(sequelize, Sequelize.DataTypes);
db.models.Ressource = require('./ressource')(sequelize, Sequelize.DataTypes);
db.models.Comment = require('./comment')(sequelize, Sequelize.DataTypes);



db.models.User.hasOne(db.models.Verif);
db.models.Verif.belongsTo(db.models.User, {foreignKey: 'userId'});

db.models.Ressource.belongsTo(db.models.User);
db.models.User.hasMany(db.models.Ressource, {foreignKey: 'userId'});

db.models.Comment.belongsTo(db.models.User);
db.models.User.hasMany(db.models.Comment, {foreignKey: 'userId'});

db.models.Comment.belongsTo(db.models.Ressource);
db.models.Ressource.hasMany(db.models.Comment, {foreignKey: 'ressourceId'});

db.models.Ressource.belongsTo(db.models.Type);
db.models.Type.hasMany(db.models.Ressource, {foreignKey: 'typeId'});

db.models.User.belongsToMany(db.models.Role, { through: db.models.User_Has_Role });
db.models.Role.belongsToMany(db.models.User, { through: db.models.User_Has_Role });

module.exports=db;
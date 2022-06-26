const express = require('express');
const db = require('./models/index');
const app=express();
const userRoutes = require('./routes/user');
const ressourceRoutes = require('./routes/ressource');
const bp = require('body-parser');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


(async () => {
  await db.sequelize.sync();
})();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/user', userRoutes);
app.use('/ressource', ressourceRoutes);

module.exports=app;
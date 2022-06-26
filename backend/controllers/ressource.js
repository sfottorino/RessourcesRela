const User = require('../models/index').models.User;
const Ressource = require('../models/index').models.Ressource;
const Verif = require('../models/index').models.Verif;
const Reset = require('../models/index').models.Reset;
const Role = require('../models/index').models.Role;
const User_Has_Role = require('../models/index').models.User_Has_Role;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/db-config');
const mailer = require('../mailer/nodeMailer');
const role = require('../models/role');

const SECRET_APP = config.SECRET_APP_KEY;


exports.getRessources = (req, res, next) => { 
    Ressource.findAll()
    .then(ressource => {
        return res.status(200).json({ressource:ressource});
    })
    .catch(err => res.status(400).json({error:'Erreur ressources'}));
}
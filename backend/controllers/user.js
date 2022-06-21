const sequelize = require(".");
const { DataTypes } = require("sequelize/types");
const User = require('../models/user')(sequelize, DataTypes);
const bcrypt = require('bcrypt');




exports.createUser = (req, res, next) => { 
    if(req.body){
        bcrypt.hash(req.body.password,10)
        .then( hash => {
            try {
                const user=User.build();   
            } catch (error) {
                console.log(error);
            }
            user.firstName=req.body.firstName;
            user.lastName=req.body.lastName;
            user.email=req.body.email;
            user.password=hash;

            console.log(user instanceof User);

            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
    }else{
        res.status(401).json({error:'Body undefined'});
    }
}
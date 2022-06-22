// const sequelize = require(".");
// const DataTypes = require("sequelize/types");
// (sequelize, DataTypes)
const User = require('../models/index').models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/db-config');

const SECRET_APP = config.SECRET_APP_KEY;




exports.createUser = (req, res, next) => { 
    if(req.body){
        bcrypt.hash(req.body.password,10)
        .then( hash => {
            try {
                const user= User.build();
                user.firstName=req.body.firstName;
                user.lastName=req.body.lastName;
                user.email=req.body.email;
                user.password=hash;
                user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }))
            } catch (error) {
                console.log(error);
            }
        })
        .catch(error => res.status(500).json({ error }));
    }else{
        res.status(401).json({error:'Body undefined'});
    }
}

exports.logUser = (req, res, next) => { 
    if(req.body){
        try {
            User.findOne({ where: { email: req.body.mail } })
            .then(user => {
                if(!user){
                    return res.status(401).json({error:"Utilisateur inexistant"});
                }
                bcrypt.compare(req.body.PW, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({error:"Erreur de connexion"});
                    }
                    return res.status(200).json({
                        userId:user.id,
                        token:jwt.sign(
                            { userId:user.id },
                            SECRET_APP,
                            {expiresIn:'24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        } catch (error) {
            console.log(error);
        }
    }else{
        return res.status(401).json({error:'Body undefined'});
    }
}
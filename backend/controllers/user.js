// const sequelize = require(".");
// const DataTypes = require("sequelize/types");
// (sequelize, DataTypes)
const User = require('../models/index').models.User;
const Verif = require('../models/index').models.Verif;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/db-config');
const mailer = require('../mailer/nodeMailer');

const SECRET_APP = config.SECRET_APP_KEY;




exports.createUser = (req, res, next) => { 
    if(req.body){
        bcrypt.hash(req.body.PW,10)
        .then( hash => {
            try {
                const user= User.build();
                user.firstName=req.body.firstName;
                user.lastName=req.body.lastName;
                user.email=req.body.mail;
                user.password=hash;
                user.save()
                .then(() => {
                    try {
                        const verif= Verif.build();
                        verif.token=jwt.sign(
                            { userId:user.id },
                            SECRET_APP
                        )
                        verif.userId=user.id
                        verif.save()
                        .then(() => {
                            const html=`<h3>Bienvenue chez Ressources Relationnelle !</h3>
                            <p>Veuillez cliquer sur le lien ci-dessous pour valider votre compte</p>
                            <a href="http://127.0.0.1:3000/validation/${verif.token}">Valider votre compte</a>
                            `
                            try {
                                mailer(user.email, "Création de compte", html);     
                            } catch (error) {
                                res.status(403).json({message: 'Erreur mail!'});
                            }  
                        })
                        .catch(error => res.status(400).json({ error })); 
                    } catch (error) {
                        res.status(402).json({message: 'Création token vérification impossible!'});
                    }
                    res.status(201).json({message: 'Utilisateur créé !'});
                })
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
                    return res.status(401).json({error:"Erreur de connexion"});
                }
                if(!user.isVerified){
                    return res.status(401).json({error:"Utilisateur non vérifié"});
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

exports.validateUser = (req, res, next) => { 
    if(req.params.token){
        Verif.findOne({ where: { token: req.params.token } })
        .then(verif => {
            User.findOne({ where: { id: verif.userId } })
            .then(user => {
                user.isVerified=true;
                user.save()
                .then(() => {
                    verif.destroy()
                    .then(() => {
                        return res.status(200).json({message:'Utilisateur vérifié!'});
                    })
                    .catch(error => {
                        return res.status(403).json({error})
                    })
                })
                .catch(error => {
                    return res.status(403).json({error});
                })
            })
            .catch(error => {
                return res.status(402).json({error});
            })
        })
        .catch(error => {
            return res.status(401).json({error});
        })
    }else{
        return res.status(401).json({error: 'Absence de token'});
    }
}
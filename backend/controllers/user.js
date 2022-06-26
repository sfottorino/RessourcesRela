const User = require('../models/index').models.User;
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


exports.createUser = (req, res, next) => { 
    if(req.body){
        if(req.body.PW.length < 6){
            return res.status(401).json({message:'Mot de passe trop court'});
        }
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
                            { userId:user.id},
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
                                return res.status(403).json({message: 'Erreur mail!'});
                            }
                            Role.findOne({where : {id:1}})
                            .then(role => {
                                const userole = User_Has_Role.build();
                                userole.userId = user.id;
                                userole.roleId = role.id;
                                userole.save()
                                .then()
                                .catch(error => res.status(400).json({ error:'Erreur role' }))
                            })
                            .catch(error => res.status(400).json({ error:'Erreur role' }))
                            res.status(201).json({message: 'Utilisateur créé !'}); 
                        })
                        .catch(error => res.status(400).json({ error:'Erreur token vérification' }));
                    } catch (error) {
                        res.status(402).json({message: 'Création token vérification impossible!'});
                    }
                })
                .catch(error => res.status(400).json({ error : 'Erreur sauvegarde' }))
            } catch (error) {
                console.log(error);
            }
        })
        .catch(error => res.status(500).json({ error }));
    }else{
        res.status(401).json({error:'Body undefined'});
    }
}

exports.isAdmin = (req, res, next) => {
    let isAdmin = false;
    if(req.auth.roles){
        req.auth.roles.forEach(element => {
            if(element.roleId==2){
                isAdmin=true;
            }
        });
        return res.status(200).json({message:isAdmin});
    }else{
        return res.status(200).json({message:false});
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
                    User_Has_Role.findAll({where:{userId: user.id}})
                    .then(userole => {
                        return res.status(200).json({
                            userId:user.id,
                            roles:userole,
                            token:jwt.sign(
                                { userId:user.id, role: userole},
                                SECRET_APP,
                                {expiresIn:'24h'}
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
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
            return res.status(401).json({error:'Token invalide'});
        })
    }else{
        return res.status(401).json({error: 'Absence de token'});
    }
}

exports.recupUser = (req, res, next) => { 
    if(req.body){
        try {
            console.log(req.body.mail);
            User.findOne({ where: { email: req.body.mail } })
            .then(user => {
                if(!user){
                    return res.status(401).json({error:"Utilisateur inexistant"});
                }
                if(!user.isVerified){
                    return res.status(401).json({error:"Utilisateur non vérifié"});
                }
                Reset.findOne({ where : { userId: user.id }})
                .then(reset => {
                    if(!reset){
                        console.log('yo');
                        const new_reset = Reset.build();
                        new_reset.userId=user.id;
                        new_reset.token=jwt.sign(
                            { userId:user.id },
                            SECRET_APP
                        );
                        let ts=Date.now();
                        new_reset.expiredAt=ts;
                        new_reset.save()
                        .then(() => {
                            const html=`<h3>Récupération de mot de passe</h3>
                            <p>Veuillez cliquer sur le lien ci-dessous pour changer votre mot de passe</p>
                            <a href="http://127.0.0.1:3000/recup/${new_reset.token}">Récupérer mon mot de passe</a>
                            `
                            try {
                                mailer(user.email, "Récupération de mot de passe", html);     
                            } catch (error) {
                                return res.status(403).json({error: 'Erreur mail!'});
                            }
                            return res.status(201).json({message:'Récupération envoyée'});
                        })
                        .catch(error => res.status(400).json({ error })); 
                    }else{
                        reset.destroy();
                        const new_reset = Reset.build();
                        new_reset.userId=user.id;
                        new_reset.token=jwt.sign(
                            { userId:user.id },
                            SECRET_APP
                        );
                        let ts=Date.now();
                        new_reset.expiredAt=ts;
                        new_reset.save()
                        .then(() => {
                            const html=`<h3>Récupération de mot de passe</h3>
                            <p>Veuillez cliquer sur le lien ci-dessous pour changer votre mot de passe</p>
                            <a href="http://127.0.0.1:3000/recup/${new_reset.token}">Récupérer mon mot de passe</a>
                            `
                            try {
                                mailer(user.email, "Récupération de mot de passe", html);     
                            } catch (error) {
                                return res.status(403).json({message: 'Erreur mail!'});
                            }
                            return res.status(201).json({message:'Récupération envoyée'});
                        })
                        .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error:"Erreur base de données" }));
        } catch (error) {
            console.log(error);
        }
    }else{
        return res.status(401).json({error:'Body undefined'});
    }
}

exports.changeMDP = (req, res, next) => { 
    if(req.body){
        try {
            Reset.findOne({ where: { token: req.body.token } })
            .then(reset => {
                if(!reset){
                    return res.status(401).json({error:"Token invalide"});
                }
                User.findOne({ where : { id: reset.userId }})
                .then(user => {
                    if(!user){
                        return res.status(401).json({error:"Utilisateur supprimé"});
                    }else{
                        bcrypt.hash(req.body.PW,10)
                        .then(hash => {
                            user.password=hash;
                            user.save()
                            .then(response => {
                                return res.status(201).json({message:'Mot de passe changé'});
                            })
                            .catch(error => res.status(400).json({ error:'Erreur d\'enregistrement' }));
                        })
                        .catch(error => res.status(400).json({ error:'Erreur cryptage' }));
                    }
                })
                .catch(error => res.status(400).json({ error:'Erreur recherche' }));
            })
            .catch(error => res.status(500).json({ error:"Erreur base de données" }));
        } catch (error) {
            console.log(error);
        }
    }else{
        return res.status(401).json({error:'Body undefined'});
    }
}
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => { 
    if(req.body){
        bcrypt.hash(req.body.password,10)
        .then( hash => {
            const user=User.build();
            user.firstName=req.body.firstName;
            user.lastName=req.body.lastName;
            user.email=req.body.email;
            user.password=hash;

            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
    }else{
        res.status(401).json({error:'Erreur'});
    }
}
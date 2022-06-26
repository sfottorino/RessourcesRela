const jwt = require('jsonwebtoken');
const config = require('../config/db-config');

const SECRET_APP = config.SECRET_APP_KEY;

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken= jwt.verify(token, SECRET_APP);
        const userId = decodedToken.userId;
        const roles = decodedToken.role;
        if(req.body.userId && req.body.userId !== userId){
            res.status(400).json({error:'Erreur de token'});
        }else{
            req.auth={userId, roles};
            next();
        }
    }catch(error){
        res.status(403).json({error : 'Requête non authentifiée !'})
    }
}
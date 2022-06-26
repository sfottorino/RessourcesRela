const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/add', userCtrl.createUser);

router.post('/connect', userCtrl.logUser);

router.post('/validate/:token', userCtrl.validateUser);

router.post('/recup', userCtrl.recupUser);

router.post('/mdp', userCtrl.changeMDP);

router.get('/isadmin', auth, userCtrl.isAdmin)

module.exports= router;
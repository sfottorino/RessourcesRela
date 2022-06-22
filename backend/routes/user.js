const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/add', userCtrl.createUser);

router.post('/connect', userCtrl.logUser);

module.exports= router;
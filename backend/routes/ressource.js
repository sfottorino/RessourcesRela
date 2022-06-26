const express = require('express');
const router = express.Router();
const userRess = require('../controllers/ressource');
const auth = require('../middleware/auth');

router.get('/', auth, userRess.getRessources);


module.exports= router;
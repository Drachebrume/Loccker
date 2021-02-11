const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');

router.get('/', indexController.index);
router.get('/register', userController.register);
router.get('/login', userController.login);


module.exports = router;

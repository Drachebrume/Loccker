const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');

const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })

router.get('/', indexController.index);
router.get('/home', csrfProtection, indexController.home);
router.get('/register', csrfProtection, userController.register);
router.get('/logout', csrfProtection, userController.logout)

router.post('/login', csrfProtection, userController.login)

router.post('/signup', csrfProtection, userController.signup)

module.exports = router;

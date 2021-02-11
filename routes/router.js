const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');

const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })

router.get('/', csrfProtection, indexController.index);
router.get('/register', csrfProtection, userController.register);



router.post('/login', csrfProtection,userController.login)

router.post('/signup', csrfProtection, userController.signup)

module.exports = router;

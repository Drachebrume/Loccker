const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');

const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })

router.get('/', indexController.index);
router.get('/register', csrfProtection, userController.register);

router.post('/signup', csrfProtection, userController.signup);

module.exports = router;

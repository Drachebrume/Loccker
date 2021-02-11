const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');

const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })

router.get('/', indexController.index);
router.get('/register', csrfProtection, userController.register);



router.post('/login',userController.login)

module.exports = router;

const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');

const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })

function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/home?status=notLogged");
  }
}

router.get('/', indexController.index);
router.get('/home', csrfProtection, indexController.home);
router.get('/register', csrfProtection, userController.register);
router.get('/logout', csrfProtection, userController.logout);
router.get('/profile', requireLogin, csrfProtection, userController.profile);

router.post('/upload', requireLogin, uploadController.upload);
router.post('/profile/delete/:fileName', requireLogin, uploadController.delete);
router.post('/profile/deleteAccount', requireLogin, userController.deleteAccount);
  
router.post('/login', csrfProtection, userController.login);

router.post('/signup', csrfProtection, userController.signup);



router.get('/*', csrfProtection, indexController.home); // redirect error url

module.exports = router;

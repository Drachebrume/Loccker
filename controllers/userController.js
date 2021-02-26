const fs = require('fs');
const path = require('path');
//contient les requêtes mongoDB
const mongo = require('../manager/mongoManager');
const crypt = require('../manager/cryptManager');
const captcha = require("nodejs-captcha");
const uniqid = require('uniqid');

exports.login = async function(req,res) {
  const user = await mongo.getUser(req.body.inputEmail);
  if (await crypt.compare(req.body.inputPassword, user.password)) { // triggers if correct
    req.session.user = user;
    console.log(req.session.user);
    res.redirect('/');
  } else {
    res.redirect('/fdp');
  }
}

exports.logout = function(req,res) {
  req.session.destroy();
  res.redirect('/?status=logout');
}

exports.register = async function(req,res) {
  const { status } = req.query;
  const result = captcha();
  console.log(result);
  let source = result.image;
  req.session.source = result.value;
  res.render('index', {
    page: 'partials/register.ejs',
    csrfToken: req.csrfToken(),
    status,
    source,
  });
}

exports.signup = async function(req,res) {
  if (req.body.captcha === req.session.source) {
    try {
      const password = await crypt.encrypt(req.body.password);
      const user = {
        "_id": `loccker:${req.body.mail}`,
        "name": req.body.name,
        "mail": req.body.mail,
        "password": password,
        "folderId": uniqid(),
      };
      if (!await mongo.getUser(user.mail)) {
        await mongo.pushUser(user);
        res.redirect('/home?status=created');
      } else {
        res.redirect('/register?status=error');
      }
    } catch(err) {
      console.log(err);
      res.redirect('/register?status=error');
    };
  } else {
    res.redirect('/register?status=captchaError');
  }
}
exports.profile = async function(req,res) {
  const { status } = req.query;
  console.log(req.session.user);
  res.render('index', {
    page: 'partials/profile.ejs',
    csrfToken: req.csrfToken(),
    status,
    user: req.session.user,
  });
}
const fs = require('fs');
const path = require('path');
//contient les requêtes mongoDB
const mongo = require('../manager/mongoManager');
const crypt = require('../manager/cryptManager');

exports.register = function(req,res, csrfProtection) {
  const a = req.csrfToken();
  console.log(a);
  res.render('index', {
    page: 'partials/register.ejs',
    csrfToken: req.csrfToken(),
  });
}

exports.login = async function(req,res) {
  const user = await mongo.getUser(req.body.inputEmail);
  if (await crypt.compare(req.body.inputPassword, user.password)) { // triggers if correct
    res.redirect('/');
  } else {
    res.redirect('/fdp');
  }
}


exports.register = async function(req,res, csrfProtection) {
  res.render('index', {
    page: 'partials/register.ejs',
    csrfToken: req.csrfToken(),
  });
}

exports.signup = async function(req,res) {
  console.log("arrive");
  try {
    const password = await crypt.encrypt(req.body.password);
    const user = {
      "_id": `loccker:${req.body.mail}`,
      "name": req.body.name,
      "mail": req.body.mail,
      "password": password
    };
    await mongo.pushUser(user);
  } catch(err) {
    console.log(err);
    res.redirect('/');
  };
  res.redirect('/register');
}

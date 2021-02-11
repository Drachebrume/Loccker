const fs = require('fs');
const path = require('path');
//contient les requêtes mongoDB
const mongo = require('../manager/mongoManager');

exports.register = function(req,res, csrfProtection) {
  const a = req.csrfToken();
  console.log(a);
  res.render('index', {
    page: 'partials/register.ejs',
    csrfToken: a,
  });
}

exports.login = async function(req,res) {
  
  const email=req.body.inputEmail;
  const pwd=req.body.inputPassword;

  const user = await mongo.getUser(req.body.inputEmail);
  console.log(user);
  console.log('email : ' + email + ' pwd : ' + pwd);
  res.redirect('/');
}


exports.register = async function(req,res, csrfProtection) {
  res.render('index', {
    page: 'partials/register.ejs',
    csrfToken: req.csrfToken(),
  });
}

exports.signup = async function(req,res) {
  try {
    const user = {
      "_id": `loccker:${req.body.mail}`,
      "name": req.body.name,
      "mail": req.body.mail,
      "password": req.body.password
    };
    await mongo.pushUser(user);
    await mongo.getUser(req.body.mail)
  } catch {
    res.redirect('/user');
  }
  res.redirect('/home');
}

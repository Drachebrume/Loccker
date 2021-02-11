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

exports.login = function(req,res) {
  
  const email=req.body.inputEmail;
  const pwd=req.body.inputPassword;
  console.log('email : ' + email + ' pwd : ' + pwd);
  res.render('index', {
    page: 'partials/login.ejs'
  });
}
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
s
  
  res.render('index', {
    page: 'partials/login.ejs'
  });
}
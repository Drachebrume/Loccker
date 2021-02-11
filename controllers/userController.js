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

exports.signup = function(req,res) {
    console.log("wesh");
    res.redirect('/register');
}
const fs = require('fs');
const path = require('path');
//contient les requêtes mongoDB
const mongo = require('../manager/mongoManager');

exports.register = async function(req,res, csrfProtection) {
  res.render('index', {
    page: 'partials/register.ejs'
    csrfToken: req.csrfToken(),
  });
}

exports.signup = async function(req,res) {
  try {
    let password = req.body.password;
    
    const user = {
      "_id": `loccker:${req.body.mail}`,
      "name": req.body.name,
      "mail": req.body.mail,
      "password": password
    };
    await mongo.getUser('a@a.a');
  } catch {
    res.redirect('/');
  }
  res.redirect('/');
}
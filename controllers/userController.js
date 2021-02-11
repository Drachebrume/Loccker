const fs = require('fs');
const path = require('path');
//contient les requêtes mongoDB
const mongo = require('../manager/mongoManager');

exports.register = function(req,res) {
  res.render('index', {
    page: 'partials/register.ejs'
  });
}

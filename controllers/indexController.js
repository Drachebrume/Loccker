const fs = require('fs');
const path = require('path');
//contient les requêtes mongoDB
const mongo = require('../manager/mongoManager');

exports.index = async function(req,res) {
  // const Mongo = await mongo.connectDB();
  
  // const db = Mongo.db('user');
  // const db2 = Mongo.db('admin');
  // const alpha = await mongo.getAllDocs(db, 'agent');
  // console.log(await mongo.getAllDatabases(db2));
  // console.log(alpha);
  const { status } = req.query;
  res.render('index', {
    page: 'partials/home.ejs',
    csrfToken: req.csrfToken(),
    status,
  });
}

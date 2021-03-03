const fs = require('fs');
const path = require('path');
//contient les requêtes mongoDB
const mongo = require('../manager/mongoManager');
const resetManger = require('../manager/resetPassManager');
const crypt = require('../manager/cryptManager');
const cloud = require('../manager/cloudinaryManager');
const captcha = require("nodejs-captcha");
const uniqid = require('uniqid');
exports.login = async function(req,res) {
  const user = await mongo.getUser(req.body.inputEmail);
  if (user) {
    if (await crypt.compare(req.body.inputPassword, user.password)) { // triggers if correct
      req.session.user = user;
      console.log(req.session.user);
      res.redirect('/');
    } else {
      res.redirect('/home?status=loginError');
    }
  } else {
    res.redirect('/home?status=loginError');
  }
}

exports.logout = function(req,res) {
  req.session.destroy();
  res.redirect('/home?status=logout');
}

exports.register = async function(req,res) {
  const { status } = req.query;
  const result = captcha();
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
        "files": [],
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
  const { user } = req.session;
  const userFetch = await mongo.getUser(user.mail);
  req.session.user = userFetch;
  let files;
  let downloadUrl = [];
  if (user.files.length > 0) {
    files = await cloud.getFiles(user.folderId, user.files);
    for (let i = 0 ; i < files.resources.length ; i+=1) {
      downloadUrl[i] = await cloud.getDownloadUrl(files.resources[i].public_id);
    }
  }
  console.log(downloadUrl);
  console.log(files);
  res.render('index', {
    page: 'partials/profile.ejs',
    csrfToken: req.csrfToken(),
    status,
    user,
    files,
    downloadUrl,
  });
}

exports.deleteAccount = async function(req,res) {
  const { user } = req.session;
  if (mongo.deleteUser(user)) {
    cloud.deleteFolder(user.folderId);
    req.session.destroy();
    res.redirect('/home?status=accountDeleted')
  } else {
    res.redirect('/profile?status=deleteAccountError')
  }
}
exports.resetPasswordRequestController = async (req, res, next) => {
  const test = await resetManger.requestPasswordReset(
    req.body.email
  );
  return res.json(test);
};

exports.resetPasswordController = async (req, res, next) => {
  const test = await resetManger.resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(test);
};
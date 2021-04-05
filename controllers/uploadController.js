const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const config = require('../config/config');
const cloud = require('../manager/cloudinaryManager');
const mongo = require('../manager/mongoManager');
exports.upload = async function(req, res) {
  const { user } = req.session;
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const file = files.uploadFile;
    const refused = /['`";]/;
    let refusedType = true;
    let refusedName = true;
    if (!(refused.test(file.name))) {
      refusedName = false;
    };
    config.whiteList.some((allowedType) => {
      if (file.type === allowedType) {
        refusedType = false;
        return true;
      }
    });
    if (refusedType | refusedName) {
      res.redirect('/profile?status=typeNotAllowed');
    } else if(file.size < 50000000) {
      const fileType = file.type.split('/')[0];
      await cloud.uploadFile(file.path, file.name, fileType, user.folderId);
      user.files.push(file.name);
      req.session.user = user;
      await mongo.updateUser(user);
      //fs.unlinkSync(newpath);
      res.redirect('/profile?status=fileUploaded');
    } else {
      res.redirect('/profile?status=fileTooLarge');
    }
  });
}

exports.delete = async function(req, res) {
  const { user } = req.session;
  const { fileName } = req.params;
  try {
    await cloud.deleteFile(user.folderId, fileName);
    const index = user.files.indexOf(fileName);
    if (index > -1) {
      user.files.splice(index, 1);
      await mongo.updateUser(user);
      req.session.user = user;
      res.redirect('/profile?status=fileDeleted');
    } else {
      res.redirect('/profile?status=deleteFileError')
    }
  } catch {
    res.redirect('/profile?status=deleteFileError')
  }
}


const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const config = require('../config/config');
const cloud = require('../manager/cloudinaryManager');
exports.upload = async function(req, res) {
  const { user } = req.session;
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const file = files.uploadFile;
    console.log(file.type);
    let refusedType = true;
    config.whiteList.some((allowedType) => {
      if (file.type === allowedType) {
        refusedType = false;
        return true;
      }
    });
    if (refusedType) {
      res.redirect('/profile?status=typeNotAllowed');
    } else if(file.size < 50000000) {
      const actualpath = process.cwd();
      const oldpath = file.path;
      const newpath = `${actualpath}/public/upload/${file.name}`; // url auto image + rename
      fs.rename(oldpath, newpath, (err2) => { // faut effacer après
        console.log(`Photo importee `);
      });
      const fileType = file.type.split('/')[0];
      await cloud.uploadFile(newpath, file.name, fileType, user.folderId);
      res.redirect('/profile?status=fileUploaded');
    } else {
      res.redirect('/profile?status=fileTooLarge');
    }
  });
}

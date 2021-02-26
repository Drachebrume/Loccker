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
    console.log(file);
    if(file.size < 50000) {
      const actualpath = process.cwd();
      const oldpath = file.path;
      const newpath = `${actualpath}/public/upload/${file.name}`; // url auto image + rename
      fs.rename(oldpath, newpath, (err2) => { // faut effacer après
        console.log(`Photo importee `);
      });
      const fileType = file.type.split('/')[0];
      await cloud.uploadFile(newpath, file.name, fileType, user.folderId);
    } else {
      res.redirect('/profile?status=fileTooLarge');
    }
    
  });
  res.redirect('/profile?status=fileUploaded');
}

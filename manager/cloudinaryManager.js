const config = require('../config/config');
const cloudinary = require('cloudinary').v2;
const cloudinaryCfg = config.cloudinary;
module.exports = {
  uploadFile: async function(filePath, fileName, fileType, folderName) {
    console.log(filePath, fileName, fileType, folderName);
    cloudinary.config(cloudinaryCfg);
    cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    public_id: `userStorage/${folderName}/${fileName}`,
    overwrite: true },
    function(error, result) {console.log(result, error)});
  }
} 
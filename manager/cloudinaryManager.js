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
  },
  listFiles: async function(folderName) {
    
    cloudinary.config(cloudinaryCfg);
    console.log(cloudinary.image("https://res.cloudinary.com/loccker/image/upload/v1614183623/userStorage/bzqhmgkljjzuzw/nhs-logo-880x4951.jpeg.jpg", {format: "png", width: 100, height: 100, crop: "fill"}));
    return await cloudinary.api.resources(
      { type: 'upload', 
        prefix: `userStorage/${folderName}/` });
  }
} 
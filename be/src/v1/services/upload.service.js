'use strict';
const cloudinary = require("../configs/cloudinary.config");
// upload one file to Cloudinary
const uploadImageFromFile = async ({
    path,
    folderName='chatApp'
}) => {
    try {

        // uplpoad base64 to cloudinary
        const rs = await cloudinary.uploader.upload(path, {
            folder: folderName
        });
        // const rs = await cloudinary.uploader.upload(path);

        return {
            url: rs.secure_url,
            thumbnail: await cloudinary.url(rs.public_id, {
                width: 100,
                height: 100,
                crop: 'fill',
                format: 'png'
            }),
        };
    } catch (error) {
        console.log("cloudinary::",error);
    }
};

module.exports = {
    uploadImageFromFile
};
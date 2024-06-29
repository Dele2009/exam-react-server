// upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req, file) => req.body.dataType,
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => Date.now().toString() + '_' + file.originalname,
    },
});

const upload = multer({ storage: storage });

module.exports = upload;

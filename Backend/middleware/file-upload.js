const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
require('dotenv').config();

const s3 = new S3Client({ region: process.env.AWS_REGION });

const fileUpload = multer({
    limits: 200000000, // limit 200MB
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const ext = file.originalname.split('.').pop();
            if (ext !== 'glb') {
                return cb(new Error('Invalid file type'), null);
            }
            const name = uuid() + new Date().getTime();
            cb(null, `models/${name}.${ext}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const isValid = ext === 'glb';
        let error = isValid ? null : new Error('Invalid file type');
        cb(error, isValid);
    }
});

module.exports = fileUpload;

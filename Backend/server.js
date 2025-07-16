const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
const routes = require('./Routes/routes');
const HttpError = require('./models/http-error');

const app = express();
const url = process.env.MONGO_URL;
const s3Client = new S3Client({ region: process.env.AWS_REGION });

app.use(bodyParser.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use('/api', routes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use(async (error, req, res, next) => {
    if (req.file) { 
        const params = {
            Bucket: req.file.bucket, 
            Key: req.file.key         
        };
        try {
            await s3Client.send(new DeleteObjectCommand(params));
            console.log(`Successfully deleted S3 object: s3://${params.Bucket}/${params.Key}`);
        } catch (s3Err) {
            console.error(`ERROR: Failed to delete S3 object: s3://${params.Bucket}/${params.Key}`, s3Err);
        }
    } 
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose.connect(url)
    .then(() => {
        app.listen(5000);
        console.log('Connected to DB! at port 5000');
    })
    .catch(err => {
        console.log(err);
    });

//module.exports.handler = serverless(app);

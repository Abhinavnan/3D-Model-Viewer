const mongoose = require('mongoose');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
const HttpError = require('../models/http-error');
const ModelDB = require('../models/model'); 

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const uploadModel = async (req, res, next) => {
    const { file } = req; 
    const name = file.originalname;
    const modelUrl = req.file.location;
    const uploadedModel = new ModelDB({ 
        name,
        url: modelUrl
    }); 
    try {
        await uploadedModel.save();
    }catch(err) {
        const error = new HttpError('Uploading model failed, please try again.', 500); 
        return next(error); 
    } 
    res.status(201).json({model: uploadedModel, message: 'Model uploaded successfully'});
};

const getModels = async (req, res, next) => {
    let models;
    try {
        models = await ModelDB.find({}); 
    }catch(err) {
        const error = new HttpError('Something went wrong, could not find models.', 500); 
        return next(error); 
    } 
    res.status(200).json({models: models.map(model => model.toObject({getters: true}))}); 
}

const deleteModel = async (req, res, next) => {
    const modelId = req.params.modelId; 
    let model; 
    try {
        model = await ModelDB.findById(modelId);
    }catch(err) {
        const error = new HttpError('Something went wrong, could not find a place.', 500); 
        return next(error); 
    }
    const modelUrl = model.url; 
    const name = model.name;
    try {
        await ModelDB.deleteOne({_id: modelId});
    }catch(err) {
        const error = new HttpError('Deleting model failed, please try again.', 500); 
        return next(error); 
    } 
    const Bucket = process.env.S3_BUCKET_NAME; 
    const replaceUrl = 'https://'+ Bucket+ '.s3.' + process.env.AWS_REGION +  '.amazonaws.com/'
    const Key = modelUrl.replace(replaceUrl,'');
    const params = { Bucket: Bucket, Key: Key };
    try {
        await s3Client.send(new DeleteObjectCommand(params));
        console.log(`Deleted S3 object: s3://${params.Bucket}/${params.Key}`);
    } catch (s3Err) {
        console.error(`ERROR: Failed to delete S3 object: s3://${params.Bucket}/${params.Key}`, s3Err);
    }

    res.status(200).json({message: 'Deleted model.', name}); 
}

module.exports = { uploadModel, getModels, deleteModel };

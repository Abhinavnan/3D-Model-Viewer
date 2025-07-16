const express = require('express');
const route = express.Router();
const modelControllers = require('./controllers');
const fileUpload = require('../middleware/file-upload');

route.get('/models', modelControllers.getModels);
route.post('/upload',fileUpload.single('model'), modelControllers.uploadModel);
route.delete('/delete/:modelId', modelControllers.deleteModel);

module.exports = route;

const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');



// API
route.post('/api/username', controller.create);
route.get('/api/username', controller.find);
route.put('/api/username/:id', controller.update);
route.delete('/api/username/:id', controller.delete);


module.exports = route
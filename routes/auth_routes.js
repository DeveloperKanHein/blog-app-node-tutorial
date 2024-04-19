const express = require('express');
const WebAuthController = require('../controller/web_auth_controller');
const route = express.Router();

route.get('/login', WebAuthController.viewLogin);
route.post('/login', WebAuthController.login);
route.get('/register', WebAuthController.viewRegister);
route.post('/register', WebAuthController.register);

module.exports = route;
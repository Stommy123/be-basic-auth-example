const { Router: ExpressRouter } = require('express');

const BaseController = require('../controllers');
const UserController = require('../controllers/user.controller');

const Router = ExpressRouter();

Router.get('/heartbeat', BaseController.checkPulse);
Router.post('/login', UserController.login);

module.exports = Router;

const { Router: ExpressRouter } = require('express');

const UserController = require('../controllers/user.controller');
const { withAuth } = require('../middleware');

const Router = ExpressRouter();

Router.get('/current', withAuth, UserController.getCurrent);

Router.post('/', UserController.create);

Router.patch('/favorite/:id', withAuth, UserController.updateFavorite);

Router.patch('/', withAuth, UserController.update);

module.exports = Router;

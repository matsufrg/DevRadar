const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:github_username', DevController.update);

module.exports = routes;
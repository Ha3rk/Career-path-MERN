const express = require('express');

const CareerController = require('./controllers/CareerController');

const routes = express.Router();

routes.get('/status', (req, res) => {
  res.send({ status: 200 });
});

//Career
routes.get('/career/:careerId', CareerController.getCareerById);
routes.get('/career', CareerController.getAllCareers);
routes.post('/career', CareerController.createCareer);
routes.post('/career/:careerId', CareerController.updateCareer);
routes.delete('/career/:careerId', CareerController.deleteCareerById);
routes.delete('/career', CareerController.deleteCareerAll);
routes.put('/career/init', CareerController.loadData);

module.exports = routes;

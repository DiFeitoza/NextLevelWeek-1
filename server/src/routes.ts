import express, { Router } from 'express';
// importa connection como knex
import knex from './database/connection';
import { PointsController } from './controllers/PointsController'
import { ItemsController } from './controllers/ItemsController'

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.show);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);

export default routes;
import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsControllers';

const routes = express.Router();

routes.get('/collect_items', new ItemsController().index);

routes.post('/collect_points', new PointsController().create);
routes.get('/collect_points/:id', new PointsController().show);
routes.get('/collect_points', new PointsController().index);

export default routes;
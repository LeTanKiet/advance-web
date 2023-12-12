import express from 'express';
import classController from '../controllers/class.controller.js';
import { authentication } from '../middlewares/auth.js';

const classRoutes = () => {
  const router = express.Router();

  router.post('/', authentication, classController.create);
  router.get('/', authentication, classController.getAll);
  router.put('/:id', authentication, classController.update);
  router.delete('/:id', authentication, classController.deleteClass);
  router.post('/join', authentication, classController.joinClass);

  return router;
};

export default classRoutes;

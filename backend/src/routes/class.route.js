import express from 'express';
import classController from '../controllers/class.controller.js';

const classRoutes = () => {
  const router = express.Router();

  router.post('/', classController.create);
  router.get('/', classController.getAll);
  router.put('/:id', classController.update);
  router.delete('/:id', classController.deleteClass);

  return router;
};

export default classRoutes;

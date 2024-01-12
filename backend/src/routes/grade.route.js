import express from 'express';
import gradeController from '../controllers/grade.controller.js';
import { authentication } from '../middlewares/auth.js';

const gradeRoutes = () => {
  const router = express.Router();

  router.get('/', authentication, gradeController.getAll);
  router.post('/', authentication, gradeController.create);
  router.put('/:id', authentication, gradeController.update);
  router.delete('/:id', authentication, gradeController.deleteGrade);

  return router;
};

export default gradeRoutes;

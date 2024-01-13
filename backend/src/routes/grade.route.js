import express from 'express';
import gradeController from '../controllers/grade.controller.js';
import { authentication, checkTeacherPermission } from '../middlewares/auth.js';

const gradeRoutes = () => {
  const router = express.Router();

  router.get('/', authentication, gradeController.getAll);
  router.post('/', authentication, checkTeacherPermission, gradeController.create);
  router.put('/:studentId', authentication, checkTeacherPermission, gradeController.updateScore);
  router.put('/grade/:id', authentication, checkTeacherPermission, gradeController.update);
  router.delete('/', authentication, checkTeacherPermission, gradeController.deleteGrade);

  router.post('/review/:id', authentication, gradeController.review);

  return router;
};

export default gradeRoutes;

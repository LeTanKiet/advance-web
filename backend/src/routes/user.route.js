import express from 'express';
import userController from '../controllers/user.controller.js';
import { authentication } from '../middlewares/auth.js';

const userRoutes = () => {
  const router = express.Router();

  router.get('/:id', authentication, userController.getById);
  router.get('/', authentication, userController.getAll);
  router.put('/:id', authentication, userController.update);
  router.delete('/:id', authentication, userController.deleteUser);

  return router;
};

export default userRoutes;

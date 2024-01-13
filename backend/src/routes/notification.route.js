import express from 'express';
import { authentication } from '../middlewares/auth.js';
import notificationController from '../controllers/notification.controller.js';

const notificationRoutes = () => {
  const router = express.Router();

  router.get('/', authentication, notificationController.getAll);

  return router;
};

export default notificationRoutes;

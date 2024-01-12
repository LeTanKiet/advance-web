import authRoutes from './auth.route.js';
import classRoutes from './class.route.js';
import gradeRoutes from './grade.route.js';
import userRoutes from './user.route.js';

export function useRoutes(app) {
  app.use('/auth', authRoutes());
  app.use('/classes', classRoutes());
  app.use('/users', userRoutes());
  app.use('/grades', gradeRoutes());
}

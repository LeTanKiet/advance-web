import authRoutes from './auth.route.js';
import classRoutes from './class.route.js';

export function useRoutes(app) {
  app.use('/auth', authRoutes());
  app.use('/classes', classRoutes());
}

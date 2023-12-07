import authRoutes from './auth.route.js';

export function useRoutes(app) {
  app.use('/auth', authRoutes());
}

import { Sequelize } from 'sequelize';
import User from './user.model.js';

const applyExtra = (sequelize) => {
  const { models } = sequelize;
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const modelDefiners = [User];

modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize));

applyExtra(sequelize);

export default sequelize;

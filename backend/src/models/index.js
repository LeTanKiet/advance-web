import { Sequelize } from 'sequelize';
import User from './user.model.js';
import Classes from './class.model.js';
import ClassUser from './class_user.model.js';
import Grade from './grade.model.js';

const applyExtra = (sequelize) => {
  const { models } = sequelize;
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const modelDefiners = [User, Classes, ClassUser, Grade];

modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize));

applyExtra(sequelize);

export default sequelize;

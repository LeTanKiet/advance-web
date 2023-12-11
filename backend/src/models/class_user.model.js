import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ClassUser = sequelize.define(
    'ClassUser',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: false },
      classId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: false },
    },
    {
      tableName: 'class_user',
      timestamps: false,
      underscored: true,
    },
  );

  ClassUser.associate = (models) => {
    ClassUser.belongsTo(models.User, { as: 'user', foreignKey: 'userId', targetKey: 'id' });
    ClassUser.belongsTo(models.Class, { as: 'class', foreignKey: 'classId', targetKey: 'id' });
  };

  return ClassUser;
};

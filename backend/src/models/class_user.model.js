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

  return ClassUser;
};

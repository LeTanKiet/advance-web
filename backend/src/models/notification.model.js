import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Notification = sequelize.define(
    'Notification',
    {
      classId: { type: DataTypes.INTEGER, allowNull: true },
      studentId: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: 'notifications',
      timestamps: false,
      underscored: true,
    },
  );

  return Notification;
};

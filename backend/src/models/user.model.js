import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: true },
      role: { type: DataTypes.STRING, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: true },
      studentId: { type: DataTypes.STRING, allowNull: true },
      avatar: { type: DataTypes.STRING, allowNull: true },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    },
  );

  return User;
};

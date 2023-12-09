import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: true },
      role: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.ClassUser, { as: 'classUsers', foreignKey: 'userId', targetKey: 'id' });
  };

  return User;
};

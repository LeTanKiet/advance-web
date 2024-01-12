import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Class = sequelize.define(
    'Class',
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      owner: { type: DataTypes.INTEGER, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {
      tableName: 'classes',
      timestamps: false,
      underscored: true,
    },
  );

  return Class;
};

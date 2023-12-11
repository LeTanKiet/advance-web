import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Class = sequelize.define(
    'Class',
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      owner: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'classes',
      timestamps: false,
      underscored: true,
    },
  );

  Class.associate = (models) => {
    Class.hasMany(models.ClassUser, { as: 'classUsers', foreignKey: 'classId', targetKey: 'id' });
  };

  return Class;
};

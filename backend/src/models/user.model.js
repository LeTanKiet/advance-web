import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Filter = sequelize.define(
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

  // Filter.associate = (models) => {
  //   Filter.belongsTo(models.Roadmap, { as: 'roadmap', foreignKey: 'roadmapId', targetKey: 'id' });
  // };

  return Filter;
};

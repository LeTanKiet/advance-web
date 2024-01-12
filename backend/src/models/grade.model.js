import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Grade = sequelize.define(
    'Grade',
    {
      classId: { type: DataTypes.INTEGER, allowNull: true },
      studentId: { type: DataTypes.STRING, allowNull: true },
      score: { type: DataTypes.FLOAT, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: true },
    },
    {
      tableName: 'grades',
      timestamps: false,
      underscored: true,
    },
  );

  return Grade;
};

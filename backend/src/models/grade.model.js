import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Grade = sequelize.define(
    'Grade',
    {
      classId: { type: DataTypes.INTEGER, allowNull: true },
      studentId: { type: DataTypes.STRING, allowNull: true },
      score: { type: DataTypes.FLOAT, allowNull: true },
      fullname: { type: DataTypes.STRING, allowNull: true },
      isMarked: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      needReview: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      gradeName: { type: DataTypes.TEXT, allowNull: true },
      scale: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      tableName: 'grades',
      timestamps: false,
      underscored: true,
    },
  );

  return Grade;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Teacher, {foreignKey : 'TeacherId'})
      Course.belongsToMany(models.Student, {through: 'StudentCourses'})
    }
  };
  Course.init({
    name: DataTypes.STRING,
    sks_amount: DataTypes.INTEGER,
    classroom: DataTypes.STRING,
    course_schedule: DataTypes.DATE,
    TeacherId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
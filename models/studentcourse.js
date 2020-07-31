'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentCourse.belongsTo(models.Student, {foreignKey:'StudentId'})
      StudentCourse.belongsTo(models.Course, {foreignKey: 'CourseId'})
    }
  };
  StudentCourse.init({
    status: DataTypes.BOOLEAN,
    StudentId : DataTypes.INTEGER,
    CourseId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentCourse',
  });

  // StudentCourse.addHook('afterCreate', (instance, options) => {
    
  // });
  return StudentCourse;
};
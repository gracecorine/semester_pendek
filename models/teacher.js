'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getfullName(){
      return `${this.first_name} ${this.last_name}`
    }
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Course)
      Teacher.hasOne(models.User)
    }
  };
  Teacher.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    nik: DataTypes.INTEGER,
    room_location: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};
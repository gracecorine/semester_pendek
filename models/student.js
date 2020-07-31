'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        get fullName() {
            return `${this.first_name} ${this.last_name}`
        }
        static associate(models) {
            // define association here
            Student.belongsToMany(models.Course, { through: 'StudentCourses' })
            Student.hasOne(models.User)
        }
    };
    Student.init({
        first_name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Please enter your first name'
                }
            }
        },
        last_name: DataTypes.STRING,
        npm: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'Please enter your npm'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Please enter your email and must same as email after register to campus'
                }
            }
        },
        major: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Please enter your major'
                }
            }
        },
        class: {
            type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: 'Please enter your major'
                    }
                }
        }
    }, {
        sequelize,
        modelName: 'Student',
    });

    Student.addHook('beforeCreate', (student, options) => {
        if (student.last_name == '') {
            student.last_name = student.first_name
        }
    });


    return Student;
};
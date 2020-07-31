'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('StudentCourses', 'StudentId', {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Students',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
     }),
     queryInterface.addColumn('StudentCourses', 'CourseId', {
      type: Sequelize.INTEGER,
      references: { //Required field
        model: 'Courses',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
   })
    ])
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('StudentCourses', 'StudentId', {}),
      queryInterface.removeColumn('StudentCourses', 'CourseId', {})
    ])
  }
};

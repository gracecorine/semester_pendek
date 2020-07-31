'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Courses', 'TeacherId', {
      type: Sequelize.INTEGER,
      references: { //Required field
        model: 'Teachers',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
   });
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Courses', 'TeacherId', {});
  }
};

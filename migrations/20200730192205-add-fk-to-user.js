'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('Users', 'StudentId', {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Students',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
     }),
     queryInterface.addColumn('Users', 'TeacherId', {
      type: Sequelize.INTEGER,
      references: { //Required field
        model: 'Teachers',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
   })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Users', 'StudentId', {}),
      queryInterface.removeColumn('Users', 'TeacherId', {})
    ])
  }
};

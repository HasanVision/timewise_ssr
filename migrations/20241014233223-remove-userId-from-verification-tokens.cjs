'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('verification_tokens', 'userId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('verification_tokens', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
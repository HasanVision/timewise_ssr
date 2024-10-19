'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tokens', 'tokenType', {
      type: Sequelize.ENUM('reset_password_verification', 'email_verification', 'secondary_email_verification', 'primary_email_update_verification'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert back to the previous ENUM without 'primary_email_update_verification'
    await queryInterface.changeColumn('tokens', 'tokenType', {
      type: Sequelize.ENUM('reset_password_verification', 'email_verification', 'secondary_email_verification'),
      allowNull: false,
    });
  }
};
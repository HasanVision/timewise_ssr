'use strict';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename the 'email' column to 'primaryEmail'
    await queryInterface.renameColumn('verification_tokens', 'email', 'primaryEmail');
  },

  async down(queryInterface, Sequelize) {
    // Rollback: Rename 'primaryEmail' back to 'email'
    await queryInterface.renameColumn('verification_tokens', 'primaryEmail', 'email');
  }
};
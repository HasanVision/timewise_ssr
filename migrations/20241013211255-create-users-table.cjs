'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creating the 'users' table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      primaryEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      secondaryEmail: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      primaryEmailVerified: {
        type: Sequelize.DATE,
        allowNull: true
      },
      secondaryEmailVerified: {
        type: Sequelize.DATE,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Dropping the 'users' table in case of rollback
    await queryInterface.dropTable('users');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new column 'role'
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'user',  // Optional default value
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove column 'role' in case of rollback
    await queryInterface.removeColumn('users', 'role');
  }
};
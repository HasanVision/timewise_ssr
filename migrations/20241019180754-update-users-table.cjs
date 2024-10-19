'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add or update the columns as needed
    await queryInterface.changeColumn('users', 'primaryEmail', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false // Set to false here as we'll use a composite unique constraint
    });

    await queryInterface.changeColumn('users', 'secondaryEmail', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false // Set to false here as we'll use a composite unique constraint
    });

    // Add a composite unique constraint for primaryEmail and secondaryEmail
    await queryInterface.addConstraint('users', {
      fields: ['primaryEmail', 'secondaryEmail'],
      type: 'unique',
      name: 'unique_emails_constraint' // Constraint name
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the composite unique constraint
    await queryInterface.removeConstraint('users', 'unique_emails_constraint');

    // Restore the individual unique constraints if necessary
    await queryInterface.changeColumn('users', 'primaryEmail', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });

    await queryInterface.changeColumn('users', 'secondaryEmail', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
  }
};
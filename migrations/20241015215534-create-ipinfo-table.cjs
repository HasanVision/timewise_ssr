'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ip_infos', {
      id: {
        type: Sequelize.UUID,  // Correct for Sequelize + MySQL
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4 // Use Sequelize's UUID generation function
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Assumes you have a 'users' table
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      network: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ipVersion: {  // Changed from 'version' to 'ipVersion'
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cityCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false
      },
      regionCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      countryName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      countryCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      inEu: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // MySQL-friendly timestamp
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') // MySQL-friendly
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ip_infos');
  }
};
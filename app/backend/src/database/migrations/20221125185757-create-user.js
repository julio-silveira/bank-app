/* eslint-disable no-undef */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        refernces: {
          model: 'accounts',
          key: 'id'
        }
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('users')
  }
}

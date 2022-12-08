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
        type: Sequelize.STRING,
        field: 'username'
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'password_hash'
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('users')
  }
}

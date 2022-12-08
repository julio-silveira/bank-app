/* eslint-disable no-undef */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('tasks', [
      {
        user_id: 1,
        status: false,
        description: 'task01'
      },
      {
        user_id: 1,
        status: true,
        description: 'task02'
      },
      {
        user_id: 2,
        status: false,
        description: 'task03'
      }
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('tasks', null, {})
  }
}

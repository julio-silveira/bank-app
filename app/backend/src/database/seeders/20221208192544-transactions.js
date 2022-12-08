/* eslint-disable no-undef */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 10,
        createdAt: '2022-12-08'
      },
      {
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: 5,
        createdAt: '2022-12-08'
      },
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 15,
        createdAt: '2022-12-08'
      },
      {
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: 25,
        createdAt: '2022-12-08'
      }
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {})
  }
}

/* eslint-disable no-undef */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      {
        debited_account_id: 1,
        credited_account_id: 2,
        value: 10,
        created_at: '2022-12-08'
      },
      {
        debited_account_id: 2,
        credited_account_id: 1,
        value: 5,
        created_at: '2022-12-08'
      },
      {
        debited_account_id: 1,
        credited_account_id: 2,
        value: 15,
        created_at: '2022-12-08'
      },
      {
        debited_account_id: 2,
        credited_account_id: 1,
        value: 25,
        created_at: '2022-12-08'
      }
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {})
  }
}

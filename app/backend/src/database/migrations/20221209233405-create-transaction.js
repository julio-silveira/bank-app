/* eslint-disable no-undef */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      debitedAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'debited_account_id',
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      creditedAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'credited_account_id',
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      }
    })
  },

  async down(queryInterface) {
    return queryInterface.dropTable('transactions')
  }
}

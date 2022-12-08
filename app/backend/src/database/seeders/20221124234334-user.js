/* eslint-disable no-undef */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'user01',
        password_hash:
          '$2a$08$LseHLb0tvQM4iTvXh6JC2udQBZtSFDYstOs/vKxWnj9Vxvv83pVne'
        // senha sem hash: 1234
      },
      {
        username: 'user02',
        password_hash:
          '$2a$08$ZqZ6n.tCIR5iR3gefaY9le8pzCH5Q66iFmNFAaB/yR0Iq0c9C4heO'
        //senha sem hash: 4321
      }
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('books', null, {})
  }
}

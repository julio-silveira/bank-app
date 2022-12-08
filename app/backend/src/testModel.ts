import Users from './database/models/UserModel'
import Account from './database/models/AccountModel'
;(async () => {
  const users = await Users.findAll({ raw: true })
  console.table(users)
  const account = await Account.findAll({ raw: true })
  console.table(account)
  // const usersWithTasks = await Users.findAll({ raw: true, include: ['tasks'] })
  // console.table(usersWithTasks)

  process.exit(0)
})()

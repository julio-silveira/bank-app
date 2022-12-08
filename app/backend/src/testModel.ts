import Users from './database/models/UserModel';
import Tasks from './database/models/TaskModel';

(async () => {

  const users = await Users.findAll({ raw: true });
  console.table(users);
  const tasks = await Tasks.findAll({raw: true});
  console.table(tasks);
  const usersWithTasks = await Users.findAll({raw:true, include: ['tasks']})
  console.table(usersWithTasks)

  process.exit(0);

})();
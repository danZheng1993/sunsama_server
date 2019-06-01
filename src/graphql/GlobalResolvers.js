// @flow
import userResolvers from './user/UserResolvers';
import taskResolvers from './tasks/TaskResolvers';

const globalResolvers = {
  Query: {
    me: userResolvers.me,
    users: userResolvers.users,
    user: userResolvers.user,
    task: taskResolvers.task,
    tasks: taskResolvers.tasks,
  },
  Mutation: {
    userAdd: userResolvers.userAdd,
    login: userResolvers.login,
    taskAdd: taskResolvers.taskAdd,
    taskUpdate: taskResolvers.taskUpdate,
    taskDelete: taskResolvers.taskDelete,
  },
  Task: taskResolvers.task,
  User: userResolvers.User,
};

export default globalResolvers;

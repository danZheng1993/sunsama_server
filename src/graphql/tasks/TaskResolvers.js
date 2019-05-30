import TaskModel from './TaskModel';
import UserModel from '../user/UserModel';

const resolvers = {
  Task: {
    user: async ({ user }) => await UserModel.findOne({ _id: user }),
  },
  task: async (obj, args, context) => {
    const { id } = args;
    const { user } = context;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    const task = await TaskModel.findOne({ _id: id });
    return task;
  },
  taskAdd: async (obj, args, context) => {
    const { title, description, time } = args;
    const { user } = context;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    const task = new TaskModel({
      title,
      description,
      time,
      user: user._id,
    });

    await task.save();

    const { _id } = task;

    return await TaskModel.findOne({ _id });
  },
  userTasks: async (args, userId) => {
    if (!userId) {
      throw new Error('NotFound');
    }

    const { date } = args;

    const where = !date ? {}
      : {
        user: userId,
        time: { $date: new Date(date) },
      };

    const tasks = TaskModel.find(where);

    return {
      count: TaskModel.count(),
      tasks,
    };
  },
  tasks: async (obj, args, context) => {
    const { user } = context;
    const { date } = args;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    const where = !date ? {}
      : {
        time: { $date: new Date(date) },
      };

    const tasks = TaskModel.find(where);

    return {
      count: TaskModel.count(),
      tasks,
    };
  },
};

export default resolvers;

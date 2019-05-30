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
      time: new Date(time),
      user: user._id,
    });

    await task.save();

    const { _id } = task;

    return await TaskModel.findOne({ _id });
  },
  taskUpdate: async (obj, args, context) => {
    const { id, title, description, time, checked } = args;
    const { user } = context;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    const task = await TaskModel.findOne({ _id: id });
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (time) {
      task.time = new Date(time);
    }
    if (checked !== undefined) {
      task.checked = checked;
    }
    await task.save();

    return task;
  },
  userTasks: async (args, userId) => {
    if (!userId) {
      throw new Error('NotFound');
    }

    const { time } = args;

    const where = !time ? {}
      : {
        user: userId,
        time: {
          $gte: new Date(`${time} 00:00:00`),
          $lte: new Date(`${time} 23:59:59`),
        },
      };

    const tasks = TaskModel.find(where);

    return {
      count: TaskModel.count(),
      tasks,
    };
  },
  tasks: async (obj, args, context) => {
    const { user } = context;
    const { time } = args;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    const where = !time ? {}
      : {
        time: {
          $gte: new Date(`${time} 00:00:00`),
          $lte: new Date(`${time} 23:59:59`),
        },
      };

    const tasks = TaskModel.find(where);

    return {
      count: TaskModel.count(),
      tasks,
    };
  },
};

export default resolvers;

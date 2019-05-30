// @flow
import UserModel from './UserModel';
import { generateToken } from '../utils';
import taskResolvers from '../tasks/TaskResolvers';

const userResolvers = {
  User: {
    tasks: ({ _id }, args) => taskResolvers.userTasks(args, _id),
  },
  me: (obj, args, context) => context.user,
  users: (obj, args) => {
    const { search, after, first } = args;

    const where = search
      ? {
        name: {
          $regex: new RegExp(`^${search}`, 'ig'),
        },
      }
      : {};

    const users = !after
      ? UserModel.find(where).limit(first)
      : UserModel.find(where)
        .skip(after)
        .limit(first);

    return {
      count: UserModel.count(),
      users,
    };
  },
  user: async (obj, args) => {
    const { id } = args;

    const user = UserModel.findOne({ _id: id });

    return user;
  },

  login: async (obj, args) => {
    const { email, password } = args;

    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const correctPassword = user.authenticate(password);

    if (!correctPassword) {
      throw new Error('Invalid email or password');
    }

    return {
      token: generateToken(user),
    };
  },

  userAdd: async (obj, args) => {
    const { email, name, password } = args;

    if (!email || !name || !password) {
      throw new Error('Please fill all the fields');
    }

    const checkEmail = UserModel.findOne({
      email,
    });

    if (!checkEmail) {
      throw new Error('This email is already registered!');
    }

    const user = new UserModel({
      name,
      email,
      password,
    });

    await user.save();

    return {
      token: generateToken(user),
    };
  },
};

export default userResolvers;

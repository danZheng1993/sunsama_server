// @flow
import { gql } from 'apollo-server';

const taskType = gql`
  type Task {
    _id: String
    title: String
    description: String
    time: String
    checked: Boolean
    user: User
  }

  type TaskConnection {
    count: Int
    tasks: [Task]
  }
`;

export default taskType;

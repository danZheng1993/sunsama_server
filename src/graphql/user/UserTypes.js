// @flow
import { gql } from 'apollo-server';

const userType = gql`
  type User {
    _id: String
    name: String
    email: String
    active: Boolean
    tasks(date: String): TaskConnection
  }
  type UserConnection {
    count: Int
    users: [User]
  }
  type UserAuth {
    token: String
  }
`;

export default userType;

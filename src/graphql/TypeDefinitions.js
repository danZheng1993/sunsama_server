// @flow
import { gql } from 'apollo-server';
import userTypes from './user/UserTypes';
import taskType from './tasks/TaskTypes';

const queryTypes = gql`
  type Query {
    me: User
    users(search: String, first: Int!, after: Int): UserConnection
    user(id: ID!): User
    tasks(time: String): TaskConnection
    task(id: ID!, time: String): Task
  }

  type Mutation {
    userAdd(name: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
    taskAdd(title: String!, description: String!, time: String!): Task
    taskUpdate(id: ID!, title: String, description: String, time: String, checked: Boolean): Task
  }
`;

const globalQuery = [taskType, userTypes, queryTypes];

export default globalQuery;

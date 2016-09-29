import { buildSchema } from 'graphql';

let schema = `
  type User {
    id: Int!
    firstName: String
    lastName: String
  }

  # the schema allows the following query:
  type Query {
    user: User
  }

  schema {
    query: Query
  }
`;

export default schema = buildSchema(schema);

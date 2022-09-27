import { gql } from "apollo-server-express";

const typeDefs = gql`

    type Query {
        users: [User!]!
        user(_id: ID): User
    }

    type User {
        _id: ID!
        username: String!
        name: String!
        email: String!
        gender: Gender!
        birthday: String!
    }

    enum Gender {
        MALE
        FEMALE
    }
`

export default typeDefs
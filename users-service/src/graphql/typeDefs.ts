import { gql } from "apollo-server-express";

const typeDefs = gql`

    type Query {
        users: [User!]!
        user(_id: ID): User
        result(value: String!): Result
    }

    type Book {
        title: String!
    }

    type Author {
        name: String!
    }

    union Result = Book | Author

    type User {
        _id: ID!
        username: String!
        name: String!
        gender: Gender!
        birthday: String!
        followings: [User!]!
        followers: [User!]!
        isVerified: Boolean!
        role: UserRoles!
        email: String!
    }

    enum UserRoles {
        USER
        ADMIN
        SUPER_ADMIN
    }

    enum Gender {
        MALE
        FEMALE
        PREFER_NOT_TO_SAY
    }

    type AuthSuccessResponse {
        accessToken: String!
        refreshToken: String!
        user: User
    }

    input SigninData {
        field: String
        password: String
    }

    input SignupData {
        username: String!
        name: String!
        password: String!
        confirmPassowrd: String!
        email: String!
        gender: Gender!
        birthday: String!
    }

    input PersonelInfoData {
        username: String
        name: String
        gender: Gender
        birthday: String
        email: String
    }

    input EditPasswordData {
        _id: ID!
        currentPassword: String!
        newPassword: String!
        confirmNewPassword: String!
    }

    type Mutation {
        signup(data: SignupData): AuthSuccessResponse
        signin(data: SigninData): AuthSuccessResponse

        editPersonelInfos(data: PersonelInfoData): User
        editPassword(data: EditPasswordData): Boolean
    }
`

export default typeDefs
import { signup, signin } from "./Mutation/authMutation";
import { users, user } from "./Query/userQuery";

const resolvers = {
    Result: {
        __resolveType: (obj: any, context: any, info: any) => {
            console.log(obj)

            return 'Author'
        }
    },
    Query: {
        users,
        user,
        result: (_: any, args: any, context: any) => {
            console.log(args)
            return {
                name: 'Bibo'
            }
        }
    },
    Mutation: {
        signup,
        signin
    }
}

export default resolvers
import { UserInputError } from "apollo-server-core";
import { getUserById, getUsers } from "../../../services/UserServices";

export const users = async (_: any, args: any, __: any) => {
    const page = parseInt(args?.page) || 1;

    const from = (page - 1) * 3;

    const users = await getUsers(from);

    return users;
}

export const user = async (_: any, args: any, __: any) => {
    const { _id } = args;

    const user = await getUserById(_id);

    if (!user) {
        throw new UserInputError('User not found');
    }

    return user;
}
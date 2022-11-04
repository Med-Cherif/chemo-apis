import { UserInputError } from "apollo-server-core";
import { comparePassword, hashPassword } from "../../../helpers/bcrypt";
import UserModel from "../../../models/User";
import { getUserById } from "../../../services/UserServices";
import { isConfirmedPassword, isValidPassword } from "../../../validation/UserValidation";

export const editPassword = async (_: any, args: any, __: any) => {
    const { data: {
        _id,
        currentPassword,
        newPassword,
        confirmNewPassword
    }} = args;

    if (!isValidPassword(newPassword) || !isConfirmedPassword(newPassword, confirmNewPassword)) {
        throw new UserInputError('User does not exist');
    }
    
    const user = await getUserById(_id);
    if (!user) throw new UserInputError('something went wrong');

    const isMatch = comparePassword(currentPassword, user.password);
    if (!isMatch) throw new UserInputError('something went wrong');

    user.password = hashPassword(newPassword);

    await user.save();

    return user;
    
}
import UserModel from "../models/User"
import { User } from "../types/user";

export const createUser = async (userData: User) => {
    const newUser = new UserModel(userData);
    const user = await newUser.save();
    return user
}

export const getUsers = async (skip: number) => {
    return UserModel.find({}).skip(skip).limit(3)
}

export const getUserById = (_id: string) => {
    return UserModel.findById(_id).lean();
}

export const getUserByEmail = (email: string) => {
    return UserModel.findOne({ email })
        .select('_id email')
        .lean();
}

export const getUserByUsername = (username: string) => {
    return UserModel.findOne({ username }).lean();
}

export const getUserByPreferedField = (field: string) => {
    return UserModel.findOne({
        $or: [
            { username: field },
            { email: field },
        ]
    })
}

export const searchUser = (query: string) => {
    return UserModel.aggregate([
        {
            $search: {
                
            }
        }
    ])
}
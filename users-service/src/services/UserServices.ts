import UserModel from "../models/User"

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

export const searchUser = (query: string) => {
    return UserModel.aggregate([
        {
            $search: {
                
            }
        }
    ])
}